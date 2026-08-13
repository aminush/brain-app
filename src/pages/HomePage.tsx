import { useEffect, useState } from 'react';
import { AuthPanel, type AuthMode } from '../components/neuro/AuthPanel';
import { BottomTabs } from '../components/neuro/BottomTabs';
import { CheckInScreen } from '../components/neuro/CheckInScreen';
import { Dashboard } from '../components/neuro/Dashboard';
import { JournalModal } from '../components/neuro/JournalModal';
import { Onboarding, type Language } from '../components/neuro/Onboarding';
import { OnboardingQuizScreen } from '../components/neuro/OnboardingQuizScreen';
import { BrainStateProvider, useBrainState } from '../context/BrainStateContext';
import type { AppCategory, Symptom } from '../lib/brainTypes';
import { supabase } from '../lib/supabase';
import type { Tab } from '../components/neuro/types';
import '../styles/neuro.css';

export function HomePage() {
  return (
    <BrainStateProvider>
      <HomeContent />
    </BrainStateProvider>
  );
}

function HomeContent() {
  const { profile, saveCheckIn, saveInitialProfile } = useBrainState();
  const [authMode, setAuthMode] = useState<AuthMode | null>(null);
  const [language, setLanguage] = useState<Language>('eng');
  const [isReady, setIsReady] = useState(false);
  const [isOnboardingQuiz, setIsOnboardingQuiz] = useState(false);
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [isAnalyzingScreenshot, setIsAnalyzingScreenshot] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [health, setHealth] = useState(42);
  const [focusMinutes, setFocusMinutes] = useState(35);
  const [isJournalOpen, setIsJournalOpen] = useState(false);

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
    setHealth(state.health);
    setFocusMinutes(Math.max(15, Math.round(state.health * 0.7)));
    setIsCheckingIn(false);
    setIsReady(true);
    setActiveTab('home');
  };

  const completeInitialQuiz = (input: Parameters<typeof saveInitialProfile>[0]) => {
    const state = saveInitialProfile(input);
    setHealth(state.health);
    setFocusMinutes(Math.max(15, Math.round(state.health * 0.7)));
    setIsOnboardingQuiz(false);
    setIsReady(true);
    setActiveTab('home');
  };

  const analyzeScreenshot = () => {
    setIsAnalyzingScreenshot(true);
    window.setTimeout(() => {
      const input = profile?.input ?? {
        appTypes: [] as AppCategory[],
        screenTime: 6,
        sleepHours: 7,
        symptoms: [] as Symptom[],
      };
      const state = saveCheckIn({
        ...input,
        appTypes: Array.from(new Set([...input.appTypes, 'shortVideo'])),
        screenTime: Math.min(15, input.screenTime + 2),
        symptoms: Array.from(new Set<Symptom>([
          ...input.symptoms,
          'gadgetFatigue',
          'stuckPhone',
        ])).slice(0, 3),
      });
      setHealth(state.health);
      setFocusMinutes(Math.max(15, Math.round(state.health * 0.7)));
      setIsAnalyzingScreenshot(false);
    }, 1200);
  };

  const openAppAfterAuth = (hasProfile: boolean) => {
    setAuthMode(null);
    if (hasProfile) {
      setIsCheckingIn(false);
      setIsReady(true);
      return;
    }
    setIsOnboardingQuiz(true);
  };

  if (isOnboardingQuiz) {
    return <OnboardingQuizScreen onComplete={completeInitialQuiz} />;
  }

  if (isCheckingIn) {
    return <CheckInScreen onComplete={completeCheckIn} />;
  }

  if (!isReady) {
    if (authMode) {
      return (
        <AuthPanel
          mode={authMode}
          onBack={() => setAuthMode(null)}
          onSuccess={() => {
            setAuthMode(null);
            setIsOnboardingQuiz(true);
          }}
        />
      );
    }

    return (
      <Onboarding
        language={language}
        onChangeLanguage={setLanguage}
        onOpenAuth={setAuthMode}
      />
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
        onAnalyzeScreenshot={analyzeScreenshot}
        onOpenCheckIn={() => setIsCheckingIn(true)}
        onOpenJournal={() => setIsJournalOpen(true)}
      />
      <BottomTabs activeTab={activeTab} onChange={setActiveTab} />
      <JournalModal isOpen={isJournalOpen} onClose={() => setIsJournalOpen(false)} />
    </>
  );
}
