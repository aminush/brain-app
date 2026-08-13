import { useEffect, useState } from 'react';
import { AuthPanel, type AuthMode } from '../components/neuro/AuthPanel';
import { BottomTabs } from '../components/neuro/BottomTabs';
import { CheckInScreen } from '../components/neuro/CheckInScreen';
import { Dashboard } from '../components/neuro/Dashboard';
import { JournalModal } from '../components/neuro/JournalModal';
import { Onboarding, type Language } from '../components/neuro/Onboarding';
import { BrainStateProvider, useBrainState } from '../context/BrainStateContext';
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
  const { profile, saveCheckIn } = useBrainState();
  const [authMode, setAuthMode] = useState<AuthMode | null>(null);
  const [language, setLanguage] = useState<Language>('eng');
  const [isReady, setIsReady] = useState(false);
  const [isCheckingIn, setIsCheckingIn] = useState(false);
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

  const openAppAfterAuth = (hasProfile: boolean) => {
    setAuthMode(null);
    if (hasProfile) {
      setIsCheckingIn(false);
      setIsReady(true);
      return;
    }
    setIsCheckingIn(true);
  };

  if (isCheckingIn) {
    return <CheckInScreen mode={isReady ? 'daily' : 'onboarding'} onComplete={completeCheckIn} />;
  }

  if (!isReady) {
    if (authMode) {
      return (
        <AuthPanel
          mode={authMode}
          onBack={() => setAuthMode(null)}
          onSuccess={() => {
            setAuthMode(null);
            setIsCheckingIn(true);
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
        onOpenCheckIn={() => setIsCheckingIn(true)}
        onOpenJournal={() => setIsJournalOpen(true)}
      />
      <BottomTabs activeTab={activeTab} onChange={setActiveTab} />
      <JournalModal isOpen={isJournalOpen} onClose={() => setIsJournalOpen(false)} />
    </>
  );
}
