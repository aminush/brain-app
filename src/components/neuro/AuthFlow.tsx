import { useState } from 'react';
import { AuthChoice } from './AuthChoice';
import { AuthPanel, type AuthMode } from './AuthPanel';
import { Onboarding } from './Onboarding';
import type { Language } from '../../lib/language';

type Props = {
  language: Language;
  onAuthSuccess: () => void;
  onChangeLanguage: (language: Language) => void;
};

export function AuthFlow({ language, onAuthSuccess, onChangeLanguage }: Props) {
  const [authMode, setAuthMode] = useState<AuthMode | null>(null);
  const [isAuthChoiceOpen, setIsAuthChoiceOpen] = useState(false);

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
      onOpenAuthChoice={() => setIsAuthChoiceOpen(true)}
    />
  );
}
