import { useState } from 'react';
import { AuthChoice } from './AuthChoice';
import { AuthPanel, type AuthMode } from './AuthPanel';
import { Onboarding } from './Onboarding';
import { OnboardingQuizScreen } from './OnboardingQuizScreen';
import type { CheckInInput } from '../../context/BrainStateContext';
import type { Language } from '../../lib/language';

type Props = {
  language: Language;
  onAuthSuccess: () => void;
  onChangeLanguage: (language: Language) => void;
  onPlanReady: (input: CheckInInput) => void;
};

export function AuthFlow({ language, onAuthSuccess, onChangeLanguage, onPlanReady }: Props) {
  const [authMode, setAuthMode] = useState<AuthMode | null>(null);
  const [isAuthChoiceOpen, setIsAuthChoiceOpen] = useState(false);
  const [isPlanOpen, setIsPlanOpen] = useState(false);

  if (isPlanOpen) {
    return (
      <OnboardingQuizScreen
        language={language}
        onComplete={(input) => {
          onPlanReady(input);
          setIsPlanOpen(false);
          setIsAuthChoiceOpen(true);
        }}
      />
    );
  }

  if (isAuthChoiceOpen) {
    return (
      <AuthChoice
        language={language}
        onBack={() => setIsAuthChoiceOpen(false)}
        onSelect={(mode) => {
          setIsAuthChoiceOpen(false);
          setAuthMode(mode);
        }}
      />
    );
  }

  if (authMode) {
    return (
      <AuthPanel
        language={language}
        mode={authMode}
        onBack={() => setAuthMode(null)}
        onSuccess={() => {
          setAuthMode(null);
          onAuthSuccess();
        }}
      />
    );
  }

  return (
    <Onboarding
      language={language}
      onChangeLanguage={onChangeLanguage}
      onOpenAuth={setAuthMode}
      onOpenAuthChoice={() => setIsPlanOpen(true)}
    />
  );
}
