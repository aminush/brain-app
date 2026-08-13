import { useState } from 'react';
import type { AppCategory, Symptom } from '../../lib/brainLogic';
import { analyzeScreenTimeImage } from '../../lib/screenTimeAi';
import { appOptions, quickQuestions, symptomOptions } from './checkInOptions';
import { MultiSelect } from './MultiSelect';

type Props = {
  mode?: 'daily' | 'onboarding';
  onComplete: (input: {
    appTypes: AppCategory[];
    screenTime: number;
    sleepHours: number;
    symptoms: Symptom[];
  }) => void;
};

export function CheckInScreen({ mode = 'daily', onComplete }: Props) {
  const [sleepHours, setSleepHours] = useState(7);
  const [screenTime, setScreenTime] = useState(5);
  const [appTypes, setAppTypes] = useState<AppCategory[]>([]);
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [aiSummary, setAiSummary] = useState('');
  const [isReading, setIsReading] = useState(false);

  async function readScreenshot(file: File) {
    setIsReading(true);
    const result = await analyzeScreenTimeImage(file);
    setScreenTime(result.screenTime);
    setAiSummary(result.appSummary);
    setIsReading(false);
  }

  return (
    <main className="neuro-shell checkin-shell">
      <section className="checkin-panel">
        <p className="eyebrow">{mode === 'onboarding' ? 'Onboarding quiz' : 'Daily check-in'}</p>
        <h1>Давай настроим твой Нейро-Аватар</h1>

        <section className="checkin-section">
          <h2>Трекер сна</h2>
          <Slider label="Сколько часов в среднем ты спишь?" max={12} step={0.5} value={sleepHours} onChange={setSleepHours} />
          <p className="hint">Сон восстанавливает гиппокамп и выводит токсины из ПФК.</p>
        </section>

        <section className="checkin-section">
          <h2>Экранное время</h2>
          <Slider label="Среднее экранное время в день" max={15} step={0.5} value={screenTime} onChange={setScreenTime} />
          <label className="upload-zone">
            {isReading ? 'ИИ анализирует скриншот...' : 'Загрузить скриншот экранного времени'}
            <input accept="image/*" onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void readScreenshot(file);
            }} type="file" />
          </label>
          {aiSummary && <p className="hint">{aiSummary}</p>}
          <MultiSelect limit={3} options={appOptions} selected={appTypes} onChange={setAppTypes} />
        </section>

        <section className="checkin-section">
          <h2>Что опишет твое состояние прямо сейчас?</h2>
          <MultiSelect limit={3} options={symptomOptions} selected={symptoms} onChange={setSymptoms} />
          <div className="quick-grid">
            {quickQuestions.map((question) => (
              <button
                className={symptoms.includes(question.id) ? 'quick-button active' : 'quick-button'}
                key={question.id}
                onClick={() => setSymptoms((items) => toggleSymptom(items, question.id))}
                type="button"
              >
                {question.label}
              </button>
            ))}
          </div>
        </section>

        <button className="primary-action" onClick={() => onComplete({ appTypes, screenTime, sleepHours, symptoms })} type="button">
          {mode === 'onboarding' ? 'Сгенерировать Нейро-Аватар' : 'Анализировать состояние'}
        </button>
      </section>
    </main>
  );
}

function Slider({ label, max, onChange, step, value }: {
  label: string;
  max: number;
  onChange: (value: number) => void;
  step: number;
  value: number;
}) {
  return (
    <label className="slider-field">
      <span>{label}</span>
      <strong>{value} ч</strong>
      <input max={max} min={0} onChange={(event) => onChange(Number(event.target.value))} step={step} type="range" value={value} />
    </label>
  );
}

function toggleSymptom(items: Symptom[], symptom: Symptom) {
  if (items.includes(symptom)) return items.filter((item) => item !== symptom);
  if (items.length >= 3) return items;
  return [...items, symptom];
}

export { CheckInScreen as OnboardingScreen };
