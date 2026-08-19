import type { Language } from '../../lib/language';

type Props = {
  language: Language;
  onContinue: () => void;
};

export function AppOverview({ language, onContinue }: Props) {
  const copy = overviewCopy[language];

  return (
    <main className="neuro-shell onboarding">
      <section className="overview-panel">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <div className="overview-grid">
          {copy.sections.map((section) => (
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

const overviewCopy = {
  eng: {
    button: 'Open app',
    eyebrow: 'Quick tour',
    sections: [
      { icon: '🧠', title: 'My Brain', text: 'Your current brain state and quick actions.' },
      { icon: '📈', title: 'Tracker', text: '7-day habit tracks plus screen, sleep and steps stats.' },
      { icon: '🎯', title: 'Exercises', text: 'Short focus, memory and breathing exercises.' },
      { icon: '📚', title: 'Science', text: 'Simple explanations for why each habit works.' },
    ],
    title: 'Your plan is ready',
  },
  рус: {
    button: 'Открыть приложение',
    eyebrow: 'Мини-обзор',
    sections: [
      { icon: '🧠', title: 'Мой мозг', text: 'Текущее состояние мозга и быстрые действия.' },
      { icon: '📈', title: 'Трекер', text: '7-дневные треки привычек, экран, сон и шаги.' },
      { icon: '🎯', title: 'Упражнения', text: 'Короткие упражнения на фокус, память и дыхание.' },
      { icon: '📚', title: 'Наука', text: 'Простые объяснения, почему привычки работают.' },
    ],
    title: 'Твой план готов',
  },
} satisfies Record<Language, {
  button: string;
  eyebrow: string;
  sections: Array<{ icon: string; title: string; text: string }>;
  title: string;
}>;
