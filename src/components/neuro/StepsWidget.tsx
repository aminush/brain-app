import { useState } from 'react';
import type { Language } from '../../lib/language';
import { readTodaySteps } from '../../lib/pedometer';

const stepGoal = 6000;

type Props = {
  language: Language;
  onChangeSteps: (steps: number) => void;
  steps: number;
};

export function StepsWidget({ language, onChangeSteps, steps }: Props) {
  const copy = language === 'eng' ? en : ru;
  const [message, setMessage] = useState(copy.goal);
  const [isReading, setIsReading] = useState(false);
  const progress = Math.min(100, Math.round((steps / stepGoal) * 100));

  async function syncSteps() {
    setIsReading(true);
    const result = await readTodaySteps(language);
    if (result.steps > 0) onChangeSteps(result.steps);
    setMessage(result.message);
    setIsReading(false);
  }

  return (
    <section className="steps-widget">
      <div className="metric-line">
        <span>{copy.steps}</span>
        <strong>{steps.toLocaleString(language === 'eng' ? 'en-US' : 'ru-RU')} / 6 000</strong>
      </div>
      <div className="progress-track steps-track">
        <div className="progress-fill steps-fill" style={{ width: `${progress}%` }} />
      </div>
      <p className="hint">{message}</p>
      <div className="steps-actions">
        <button className="secondary-button" disabled={isReading} onClick={syncSteps} type="button">
          {isReading ? copy.reading : copy.read}
        </button>
        <label className="steps-input">
          <span>{copy.manual}</span>
          <input
            min={0}
            onChange={(event) => onChangeSteps(Number(event.target.value))}
            type="number"
            value={steps}
          />
        </label>
      </div>
    </section>
  );
}

const en = {
  goal: 'Goal for today: 6,000 steps.',
  manual: 'Enter manually',
  read: 'Read steps',
  reading: 'Reading steps...',
  steps: 'Steps',
};

const ru = {
  goal: 'Цель на сегодня: 6 000 шагов.',
  manual: 'Ввести вручную',
  read: 'Считать шаги',
  reading: 'Считываю шаги...',
  steps: 'Шаги',
};
