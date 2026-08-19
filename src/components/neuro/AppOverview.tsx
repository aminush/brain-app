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
        <p>{copy.text}</p>
        <div className="overview-grid">
          {copy.sections.map((section) => (
            <article key={section.title}>
              <span>{section.icon}</span>
              <h2>{section.title}</h2>
              <p>{section.text}</p>
              <ul>
                {section.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
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
      {
        icon: '🧠',
        title: 'My Brain',
        text: 'Your main dashboard for today.',
        features: ['Synap Index', 'weak brain zone', 'screen-time screenshot analysis'],
      },
      {
        icon: '📈',
        title: 'Tracker',
        text: 'A 7-day plan that turns progress into visible steps.',
        features: ['habit tracks', 'daily tasks', 'sleep, steps and screen stats'],
      },
      {
        icon: '🎯',
        title: 'Exercises',
        text: 'Fast resets when focus drops.',
        features: ['breathing rhythms', 'memory grid', 'Fill Your Cup quests'],
      },
      {
        icon: '📚',
        title: 'Science',
        text: 'Short explanations behind each habit.',
        features: ['scrolling and dopamine', 'sleep and focus', 'walking and memory'],
      },
    ],
    text: 'Here are the main sections and what each one helps you do.',
    title: 'Your plan is ready',
  },
  рус: {
    button: 'Открыть приложение',
    eyebrow: 'Мини-обзор',
    sections: [
      {
        icon: '🧠',
        title: 'Мой мозг',
        text: 'Главный экран состояния на сегодня.',
        features: ['Synap Index', 'слабая зона мозга', 'анализ скриншота экранного времени'],
      },
      {
        icon: '📈',
        title: 'Трекер',
        text: '7-дневный план, где прогресс видно по шагам.',
        features: ['треки привычек', 'ежедневные задания', 'сон, шаги и экранное время'],
      },
      {
        icon: '🎯',
        title: 'Упражнения',
        text: 'Быстрые перезагрузки, когда фокус просел.',
        features: ['дыхательные ритмы', 'сетка памяти', 'Fill Your Cup квесты'],
      },
      {
        icon: '📚',
        title: 'Наука',
        text: 'Короткие объяснения, почему привычки работают.',
        features: ['скроллинг и дофамин', 'сон и фокус', 'ходьба и память'],
      },
    ],
    text: 'Вот основные разделы и что в них можно делать.',
    title: 'Твой план готов',
  },
} satisfies Record<Language, {
  button: string;
  eyebrow: string;
  sections: Array<{ features: string[]; icon: string; title: string; text: string }>;
  text: string;
  title: string;
}>;
