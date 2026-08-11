import type { Goal } from './types';

const problems = ['Туман после соцсетей', 'Потеря мотивации', 'Прокрастинация'];
const goals: Goal[] = ['Фокус', 'Креативность', 'Детокс'];

type Props = {
  step: number;
  selectedProblems: string[];
  selectedGoal: Goal;
  onNext: () => void;
  onToggleProblem: (problem: string) => void;
  onSelectGoal: (goal: Goal) => void;
  onFinish: () => void;
};

export function Onboarding({
  step,
  selectedProblems,
  selectedGoal,
  onNext,
  onToggleProblem,
  onSelectGoal,
  onFinish,
}: Props) {
  if (step === 1) {
    return (
      <main className="neuro-shell onboarding">
        <section className="manifest">
          <p className="eyebrow">Neuro reboot protocol</p>
          <h1>Your brain is not broken. It's just overloaded.</h1>
          <p>
            Мы мягко включим ПФК: уберём шум, вернём управление вниманием и
            запустим короткие действия вместо бесконечного скролла.
          </p>
          <button className="primary-action" onClick={onNext}>Start reboot</button>
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
