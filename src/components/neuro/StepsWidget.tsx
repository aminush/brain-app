import { useState } from 'react';
import { readTodaySteps } from '../../lib/pedometer';

const stepGoal = 6000;

type Props = {
  onChangeSteps: (steps: number) => void;
  steps: number;
};

export function StepsWidget({ onChangeSteps, steps }: Props) {
  const [message, setMessage] = useState('Цель на сегодня: 6 000 шагов.');
  const [isReading, setIsReading] = useState(false);
  const progress = Math.min(100, Math.round((steps / stepGoal) * 100));

  async function syncSteps() {
    setIsReading(true);
    const result = await readTodaySteps();
    if (result.steps > 0) onChangeSteps(result.steps);
    setMessage(result.message);
    setIsReading(false);
  }

  return (
    <section className="steps-widget">
      <div className="metric-line">
        <span>Шаги</span>
        <strong>{steps.toLocaleString('ru-RU')} / 6 000</strong>
      </div>
      <div className="progress-track steps-track">
        <div className="progress-fill steps-fill" style={{ width: `${progress}%` }} />
      </div>
      <p className="hint">{message}</p>
      <div className="steps-actions">
        <button className="secondary-button" disabled={isReading} onClick={syncSteps} type="button">
          {isReading ? 'Считываю шаги...' : 'Считать шаги'}
        </button>
        <label className="steps-input">
          <span>Ввести вручную</span>
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
