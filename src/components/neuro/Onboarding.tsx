import type { Goal } from './types';
import type { AuthMode } from './AuthPanel';
import { FaceSilhouette } from './FaceSilhouette';
import { GlassDecor } from './GlassDecor';

const problems = ['Туман после соцсетей', 'Потеря мотивации', 'Прокрастинация'];
const goals: Goal[] = ['Фокус', 'Креативность', 'Детокс'];
const languages = ['eng', 'рус'] as const;

type Language = (typeof languages)[number];

type Props = {
  language: Language;
  step: number;
  selectedProblems: string[];
  selectedGoal: Goal;
  onChangeLanguage: (language: Language) => void;
  onNext: () => void;
  onOpenAuth: (mode: AuthMode) => void;
  onToggleProblem: (problem: string) => void;
  onSelectGoal: (goal: Goal) => void;
  onFinish: () => void;
};

export function Onboarding({
  language,
  step,
  selectedProblems,
  selectedGoal,
  onChangeLanguage,
  onNext,
  onOpenAuth,
  onToggleProblem,
  onSelectGoal,
  onFinish,
}: Props) {
  if (step === 1) {
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
              <button className="auth-nav-button" onClick={() => onOpenAuth('signup')} type="button">
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
            <button className="primary-action start-button" onClick={onNext} type="button">
              Start reboot
            </button>
          </div>

          <FaceSilhouette />
          <GlassDecor />
        </section>
      </main>
    );
  }

  if (step === 2) {
    return (
      <main className="neuro-shell onboarding">
        <section className="setup-panel">
          <p className="eyebrow">Шаг 2 из 3</p>
          <h1>Что сейчас мешает?</h1>
          <div className="check-list">
            {problems.map((problem) => (
              <label className="check-row" key={problem}>
                <input
                  checked={selectedProblems.includes(problem)}
                  onChange={() => onToggleProblem(problem)}
                  type="checkbox"
                />
                <span>{problem}</span>
              </label>
            ))}
          </div>
          <button className="primary-action" onClick={onNext}>Продолжить</button>
        </section>
      </main>
    );
  }

  return (
    <main className="neuro-shell onboarding">
      <section className="setup-panel">
        <p className="eyebrow">Шаг 3 из 3</p>
        <h1>Выбери цель</h1>
        <div className="goal-grid">
          {goals.map((goal) => (
            <button
              className={goal === selectedGoal ? 'goal-card active' : 'goal-card'}
              key={goal}
              onClick={() => onSelectGoal(goal)}
              type="button"
            >
              {goal}
            </button>
          ))}
        </div>
        <button className="primary-action" onClick={onFinish}>
          Активировать Нейро-Аватар
        </button>
      </section>
    </main>
  );
}

export type { Language };
