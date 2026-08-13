import { useState } from 'react';
import type { AppCategory, Symptom } from '../../lib/brainLogic';
import { appOptions, symptomOptions } from './checkInOptions';
import { MultiSelect } from './MultiSelect';

const goals = [
  'Усилить фокус и волю ПФК',
  'Вернуть память и гиппокамп',
  'Снизить тревожность амигдалы',
  'Восстановить мотивацию лимбической системы',
];

type Props = {
  onComplete: (input: {
    appTypes: AppCategory[];
    screenTime: number;
    sleepHours: number;
    symptoms: Symptom[];
  }) => void;
};

export function OnboardingQuizScreen({ onComplete }: Props) {
  const [sleepHours, setSleepHours] = useState(7);
  const [screenTime, setScreenTime] = useState(6);
  const [appTypes, setAppTypes] = useState<AppCategory[]>([]);
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  return (
    <main className="neuro-shell checkin-shell">
      <section className="checkin-panel">
        <p className="eyebrow">Первичный онбординг</p>
        <h1>Глубокая настройка Synap</h1>
        <section className="checkin-section">
          <h2>Фоновый профиль сна</h2>
          <Slider label="Сколько часов ты обычно спишь?" max={12} value={sleepHours} onChange={setSleepHours} />
          <p className="hint">Это хронический фон, а не только вчерашняя ночь.</p>
        </section>
        <section className="checkin-section">
          <h2>Цифровой профиль</h2>
          <Slider label="Обычное экранное время" max={15} value={screenTime} onChange={setScreenTime} />
          <MultiSelect limit={3} options={appOptions} selected={appTypes} onChange={setAppTypes} />
        </section>
        <section className="checkin-section">
          <h2>Длительные симптомы</h2>
          <MultiSelect limit={3} options={symptomOptions} selected={symptoms} onChange={setSymptoms} />
        </section>
        <section className="checkin-section">
          <h2>Стратегическая цель</h2>
          <div className="choice-grid">
            {goals.map((goal) => (
              <button
                className={selectedGoals.includes(goal) ? 'choice-pill active' : 'choice-pill'}
                key={goal}
                onClick={() => setSelectedGoals(toggleGoal(selectedGoals, goal))}
                type="button"
              >
                {goal}
              </button>
            ))}
          </div>
        </section>
        <button className="primary-action" onClick={() => onComplete({ appTypes, screenTime, sleepHours, symptoms })} type="button">
          Сгенерировать Нейро-Аватар
        </button>
      </section>
    </main>
  );
}

function Slider({ label, max, onChange, value }: {
  label: string;
  max: number;
  onChange: (value: number) => void;
  value: number;
}) {
  return (
    <label className="slider-field">
      <span>{label}</span>
      <strong>{value} ч</strong>
      <input max={max} min={0} onChange={(event) => onChange(Number(event.target.value))} step={0.5} type="range" value={value} />
    </label>
  );
}

function toggleGoal(items: string[], goal: string) {
  if (items.includes(goal)) return items.filter((item) => item !== goal);
  return [...items, goal].slice(0, 2);
}
