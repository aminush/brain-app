import type { AuthMode } from './AuthPanel';
import { FaceSilhouette } from './FaceSilhouette';
import { GlassDecor } from './GlassDecor';
import { LanguageSwitch } from './LanguageSwitch';
import { text, type Language } from '../../lib/language';

type Props = {
  language: Language;
  onChangeLanguage: (language: Language) => void;
  onOpenAuth: (mode: AuthMode) => void;
  onOpenAuthChoice: () => void;
};

export function Onboarding({
  language,
  onChangeLanguage,
  onOpenAuth,
  onOpenAuthChoice,
}: Props) {
  const t = text[language];

  return (
    <main className="landing-shell">
      <section className="landing-frame">
        <header className="landing-topbar">
          <div className="brand-mark">synap</div>
          <LanguageSwitch language={language} onChangeLanguage={onChangeLanguage} />
          <div className="auth-corner">
            <button className="auth-nav-button" onClick={() => onOpenAuth('login')} type="button">
              {t.login}
            </button>
            <button
              className="auth-nav-button"
              onClick={() => onOpenAuth('signup')}
              type="button"
            >
              {t.signup}
            </button>
          </div>
        </header>

        <div className="landing-copy">
          <p className="eyebrow">{t.landingEyebrow}</p>
          <h1>{t.landingTitle}</h1>
          <p>{t.landingText}</p>
          <button className="primary-action start-button" onClick={onOpenAuthChoice} type="button">
            {t.start}
          </button>
        </div>

        <FaceSilhouette />
        <GlassDecor />
      </section>
    </main>
  );
}
