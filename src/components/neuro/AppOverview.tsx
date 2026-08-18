import type { Language } from '../../lib/language';

type Props = {
  language: Language;
  onContinue: () => void;
};

const sections = [
  { icon: '🧠', title: 'My Brain', text: 'Your current brain state and quick actions.' },
  { icon: '📈', title: 'Tracker', text: '7-day habit tracks plus screen, sleep and steps stats.' },
  { icon: '🎯', title: 'Exercises', text: 'Short focus, memory and breathing exercises.' },
  { icon: '📚', title: 'Science', text: 'Simple explanations for why each habit works.' },
];

export function AppOverview({ language, onContinue }: Props) {
  const copy = language === 'eng'
    ? { button: 'Open app', eyebrow: 'Quick tour', title: 'Your plan is ready' }
    : { button: 'Открыть приложение', eyebrow: 'Мини-обзор', title: 'Твой план готов' };

  return (
    <main className="neuro-shell onboarding">
      <section className="overview-panel">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <div className="overview-grid">
          {sections.map((section) => (
            <article key={section.title}>
              <span>{section.icon}</span>
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </article>
          ))}
        </div>
        <button className="primary-action" onClick={onContinue} type="button">
          {copy.button}
        </button>
      </section>
    </main>
  );
}
