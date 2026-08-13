import type { AuthMode } from './AuthPanel';
import { FaceSilhouette } from './FaceSilhouette';
import { GlassDecor } from './GlassDecor';

const languages = ['eng', 'рус'] as const;

type Language = (typeof languages)[number];

type Props = {
  language: Language;
  onChangeLanguage: (language: Language) => void;
  onOpenAuth: (mode: AuthMode) => void;
};

export function Onboarding({
  language,
  onChangeLanguage,
  onOpenAuth,
}: Props) {
  return (
    <main className="landing-shell">
      <section className="landing-frame">
        <header className="landing-topbar">
          <div className="brand-mark">synap</div>
          <div className="language-switch" aria-label="Language">
            {languages.map((item) => (
              <button
                className={item === language ? 'language-button active' : 'language-button'}
                key={item}
                onClick={() => onChangeLanguage(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
          <div className="auth-corner">
            <button className="auth-nav-button" onClick={() => onOpenAuth('login')} type="button">
              Log in
            </button>
            <button
              className="auth-nav-button"
              onClick={() => onOpenAuth('signup')}
              type="button"
            >
              Sign up
            </button>
          </div>
        </header>

        <div className="landing-copy">
          <p className="eyebrow">Neuro reboot protocol</p>
          <h1>Your brain is not broken. It's just overloaded.</h1>
          <p>
            Get back your attention, self-control, and implement new activities
            instead of endless scrolling.
          </p>
          <button className="primary-action start-button" onClick={() => onOpenAuth('signup')} type="button">
            Start reboot
          </button>
        </div>

        <FaceSilhouette />
        <GlassDecor />
      </section>
    </main>
  );
}

export type { Language };
