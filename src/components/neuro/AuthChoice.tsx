import type { AuthMode } from './AuthPanel';
import { text, type Language } from '../../lib/language';

type Props = {
  language: Language;
  onBack: () => void;
  onSelect: (mode: AuthMode) => void;
};

export function AuthChoice({ language, onBack, onSelect }: Props) {
  const t = text[language];

  return (
    <main className="neuro-shell onboarding">
      <section className="auth-page">
        <button className="text-button" onClick={onBack} type="button">
          {t.back}
        </button>
        <div className="auth-card">
          <p className="eyebrow">{t.neuroAccess}</p>
          <h1>{t.authChoiceTitle}</h1>
          <p className="auth-message">{t.authChoiceText}</p>
          <div className="auth-choice">
            <button className="primary-action" onClick={() => onSelect('signup')} type="button">
              {t.signup}
            </button>
            <button className="outline-action" onClick={() => onSelect('login')} type="button">
              {t.login}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
