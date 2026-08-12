import { useCallback, useState } from 'react';
import { AuthPanel, type AuthMode } from '../components/neuro/AuthPanel';
import { BottomTabs } from '../components/neuro/BottomTabs';
import { Dashboard } from '../components/neuro/Dashboard';
import { JournalModal } from '../components/neuro/JournalModal';
import { Onboarding, type Language } from '../components/neuro/Onboarding';
import { RescueModal } from '../components/neuro/RescueModal';
import { ResultModal } from '../components/neuro/ResultModal';
import type { AnalysisResult, Goal, Tab } from '../components/neuro/types';
import '../styles/neuro.css';

export function HomePage() {
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [authMode, setAuthMode] = useState<AuthMode | null>(null);
  const [language, setLanguage] = useState<Language>('eng');
  const [isReady, setIsReady] = useState(false);
  const [selectedProblems, setSelectedProblems] = useState<string[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<Goal>('Фокус');
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [health, setHealth] = useState(42);
  const [focusMinutes, setFocusMinutes] = useState(35);
  const [isRescueOpen, setIsRescueOpen] = useState(false);
  const [isJournalOpen, setIsJournalOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const toggleProblem = (problem: string) => {
    setSelectedProblems((current) =>
      current.includes(problem)
        ? current.filter((item) => item !== problem)
        : [...current, problem],
    );
  };

  const completeRescue = useCallback(() => {
    setHealth((value) => Math.min(100, value + 20));
    setFocusMinutes((value) => value + 5);
    setIsRescueOpen(false);
  }, []);

  const analyzeScreenshot = () => {
    setIsAnalyzing(true);
    window.setTimeout(() => {
      const nextHealth = randomHealth();
      const result = {
        health: nextHealth,
        focus: Math.max(15, Math.round(nextHealth * 0.8)),
        note: nextHealth < 45
          ? 'Много цифрового шума. Нужен короткий офлайн-ритуал.'
          : 'Нагрузка заметна, но система ещё держит фокус.',
      };
      setHealth(result.health);
      setFocusMinutes(result.focus);
      setAnalysisResult(result);
      setIsAnalyzing(false);
    }, 1400);
  };

  if (!isReady) {
    if (authMode) {
      return (
        <AuthPanel
          mode={authMode}
          onBack={() => setAuthMode(null)}
          onSuccess={() => setIsReady(true)}
        />
      );
    }

    return (
      <Onboarding
        language={language}
        onChangeLanguage={setLanguage}
        onFinish={() => setIsReady(true)}
        onNext={() => setOnboardingStep((step) => Math.min(3, step + 1))}
        onOpenAuth={setAuthMode}
        onSelectGoal={setSelectedGoal}
        onToggleProblem={toggleProblem}
        selectedGoal={selectedGoal}
        selectedProblems={selectedProblems}
        step={onboardingStep}
      />
    );
  }

  return (
    <>
      <Dashboard
        activeTab={activeTab}
        focusMinutes={focusMinutes}
        health={health}
        onOpenJournal={() => setIsJournalOpen(true)}
        onOpenRescue={() => setIsRescueOpen(true)}
        onPickScreenshot={analyzeScreenshot}
      />
      <BottomTabs activeTab={activeTab} onChange={setActiveTab} />
      <RescueModal
        isOpen={isRescueOpen}
        onClose={() => setIsRescueOpen(false)}
        onComplete={completeRescue}
      />
      <ResultModal
        isLoading={isAnalyzing}
        onClose={() => setAnalysisResult(null)}
        result={analysisResult}
      />
      <JournalModal isOpen={isJournalOpen} onClose={() => setIsJournalOpen(false)} />
    </>
  );
}

function randomHealth() {
  return Math.floor(Math.random() * 46) + 30;
}
