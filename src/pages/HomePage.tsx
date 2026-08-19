import { useEffect, useState } from 'react';
import { AuthFlow } from '../components/neuro/AuthFlow';
import { AppOverview } from '../components/neuro/AppOverview';
import { BottomTabs } from '../components/neuro/BottomTabs';
import { CheckInScreen } from '../components/neuro/CheckInScreen';
import { Dashboard } from '../components/neuro/Dashboard';
import { JournalModal } from '../components/neuro/JournalModal';
import { OnboardingQuizScreen } from '../components/neuro/OnboardingQuizScreen';
import { BrainStateProvider, useBrainState } from '../context/BrainStateContext';
import { NeuroXpProvider } from '../context/NeuroXpContext';
import type { CheckInInput } from '../context/BrainStateContext';
import { createScreenshotCheckInInput } from '../lib/checkInInput';
import type { Language } from '../lib/language';
import { analyzeScreenTimeImage } from '../lib/screenTimeAi';
import { supabase } from '../lib/supabase';
import { loadTrackerEntries } from '../lib/tracker';
import type { Tab } from '../components/neuro/types';
import '../styles/neuro.css';

export function HomePage() {
  return <BrainStateProvider><NeuroXpProvider><HomeContent /></NeuroXpProvider></BrainStateProvider>;
}

function HomeContent() {
  const { profile, saveCheckIn, saveInitialProfile, updateSteps } = useBrainState();
  const [language, setLanguage] = useState<Language>('eng');
  const [isReady, setIsReady] = useState(false);
  const [isOnboardingQuiz, setIsOnboardingQuiz] = useState(false);
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [isAnalyzingScreenshot, setIsAnalyzingScreenshot] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [health, setHealth] = useState(42);
  const [focusMinutes, setFocusMinutes] = useState(35);
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [plannedInput, setPlannedInput] = useState<CheckInInput | null>(null);
  const [trackerEntries, setTrackerEntries] = useState(() => loadTrackerEntries());

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) openAppAfterAuth(Boolean(profile));
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) openAppAfterAuth(Boolean(profile));
    });

    return () => data.subscription.unsubscribe();
  }, [profile]);

  const completeCheckIn = (input: Parameters<typeof saveCheckIn>[0]) => {
    const state = saveCheckIn(input);
    applyBrainState(state.health);
    setIsCheckingIn(false);
    setIsReady(true);
    setActiveTab('home');
  };

  const completeInitialQuiz = (input: Parameters<typeof saveInitialProfile>[0]) => {
    const state = saveInitialProfile(input);
    applyBrainState(state.health);
    setIsOnboardingQuiz(false);
    setIsOverviewOpen(true);
    setIsReady(true);
    setActiveTab('home');
  };

  const finishAuth = () => {
    if (!plannedInput) {
      setIsOnboardingQuiz(true);
      return;
    }
    completeInitialQuiz(plannedInput);
    setPlannedInput(null);
  };

  const analyzeScreenshot = async (file: File) => {
    setIsAnalyzingScreenshot(true);
    try {
      const result = await analyzeScreenTimeImage(file, language);
      const state = saveCheckIn(createScreenshotCheckInInput(profile?.input, result));
      applyBrainState(state.health);
    } finally {
      setIsAnalyzingScreenshot(false);
    }
  };

  const openAppAfterAuth = (hasProfile: boolean) => {
    if (hasProfile) {
      setIsCheckingIn(false);
      setIsReady(true);
      return;
    }
    setIsOnboardingQuiz(true);
  };

  const logOut = async () => {
    await supabase.auth.signOut();
    setIsReady(false);
    setIsOnboardingQuiz(false);
    setIsOverviewOpen(false);
    setIsCheckingIn(false);
    setActiveTab('home');
  };

  const changeSteps = (steps: number) => {
    const state = updateSteps(steps);
    if (!state) return;
    applyBrainState(state.health);
  };

  const applyBrainState = (nextHealth: number) => {
    setHealth(nextHealth);
    setFocusMinutes(Math.max(15, Math.round(nextHealth * 0.7)));
    setTrackerEntries(loadTrackerEntries());
  };
  if (isOnboardingQuiz) {
    return <OnboardingQuizScreen language={language} onComplete={completeInitialQuiz} />;
  }

  if (isCheckingIn) {
    return <CheckInScreen language={language} onComplete={completeCheckIn} />;
  }

  if (isOverviewOpen) {
    return <AppOverview language={language} onContinue={() => setIsOverviewOpen(false)} />;
  }

  if (!isReady) {
    return (
      <AuthFlow language={language} onAuthSuccess={finishAuth} onChangeLanguage={setLanguage} onPlanReady={setPlannedInput} />
    );
  }

  return (
    <>
      <Dashboard
        activeTab={activeTab}
        brainState={profile?.state}
        focusMinutes={focusMinutes}
        health={profile?.state.health ?? health}
        isAnalyzingScreenshot={isAnalyzingScreenshot}
        language={language}
        selectedHabitTrackId={profile?.input.selectedHabitTrackId}
        screenInsight={profile?.input.screenInsight}
        steps={profile?.input.steps ?? 0}
        trackerEntries={trackerEntries}
        onAnalyzeScreenshot={analyzeScreenshot}
        onChangeLanguage={setLanguage}
        onChangeSteps={changeSteps}
        onLogOut={logOut}
        onOpenCheckIn={() => setIsCheckingIn(true)}
        onOpenJournal={() => setIsJournalOpen(true)}
      />
      <BottomTabs activeTab={activeTab} language={language} onChange={setActiveTab} />
      <JournalModal isOpen={isJournalOpen} language={language} onClose={() => setIsJournalOpen(false)} />
    </>
  );
}
