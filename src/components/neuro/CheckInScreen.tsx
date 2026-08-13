import { useState } from 'react';
import type { AppCategory, Symptom } from '../../lib/brainLogic';
import { analyzeScreenTimeImage } from '../../lib/screenTimeAi';
import { dailyStateOptions } from './checkInOptions';
import { MultiSelect } from './MultiSelect';

type Props = {
  onComplete: (input: {
    appTypes: AppCategory[];
    screenTime: number;
    sleepHours: number;
    symptoms: Symptom[];
  }) => void;
};

export function CheckInScreen({ onComplete }: Props) {
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
    setAppTypes(detectApps(result.appSummary));
    setIsReading(false);
  }

  return (
    <main className="neuro-shell checkin-shell">
      <section className="checkin-panel">
        <p className="eyebrow">Daily check-in</p>
        <h1>Daily Check-in за 30 секунд</h1>

        <section className="checkin-section">
          <h2>Трекер сна</h2>
          <Slider label="Сколько часов ты спала вчера?" max={12} step={0.5} value={sleepHours} onChange={setSleepHours} />
        </section>

        <section className="checkin-section">
          <h2>Экранное время</h2>
          <Slider label="Сегодняшнее экранное время" max={15} step={0.5} value={screenTime} onChange={setScreenTime} />
          <label className="upload-zone">
            {isReading ? 'ИИ анализирует скриншот...' : 'Загрузить скриншот экранного времени'}
            <input accept="image/*" onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) void readScreenshot(file);
            }} type="file" />
          </label>
          {aiSummary && <p className="hint">{aiSummary}</p>}
        </section>

        <section className="checkin-section">
          <h2>Слова о текущем состоянии</h2>
          <MultiSelect limit={3} options={dailyStateOptions} selected={symptoms} onChange={setSymptoms} />
        </section>

        <button className="primary-action" onClick={() => onComplete({ appTypes, screenTime, sleepHours, symptoms })} type="button">
          Анализировать состояние
        </button>
      </section>
    </main>
  );
}

function detectApps(summary: string): AppCategory[] {
  const text = summary.toLowerCase();
  const apps: AppCategory[] = [];
  if (/tiktok|reels|shorts|instagram/.test(text)) apps.push('shortVideo');
  if (/telegram|whatsapp|news|новост/.test(text)) apps.push('messages');
  if (/google|maps|карты|поиск/.test(text)) apps.push('search');
  return apps;
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
