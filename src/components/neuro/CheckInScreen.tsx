import { useState } from 'react';
import type { CheckInInput } from '../../context/BrainStateContext';
import type { Symptom } from '../../lib/brainLogic';
import type { Language } from '../../lib/language';
import { getCheckInCopy, localizeMoods, localizeScroll, scrollOptions } from './checkInCopy';

type Props = {
  language: Language;
  onComplete: (input: CheckInInput) => void;
};

export function CheckInScreen({ language, onComplete }: Props) {
  const [sleepHours, setSleepHours] = useState(7.5);
  const [screenHours, setScreenHours] = useState(5);
  const [screenMinutes, setScreenMinutes] = useState(12);
  const [mood, setMood] = useState<Symptom>('distracted');
  const [scrolling, setScrolling] = useState(scrollOptions[1]);
  const [isDone, setIsDone] = useState(false);
  const copy = getCheckInCopy(language);

  function finish() {
    setIsDone(true);
    window.setTimeout(() => {
      onComplete({
        appTypes: scrolling.apps,
        screenTime: screenHours + screenMinutes / 60,
        sleepHours,
        symptoms: Array.from(new Set([mood, ...scrolling.symptoms])),
      });
    }, 760);
  }

  return (
    <main className="neuro-shell checkin-shell">
      <section className="checkin-panel">
        <p className="eyebrow">Daily check-in</p>
        <h1>{copy.brainTitle}</h1>
        <OptionRow options={localizeMoods(language)} selected={mood} onSelect={setMood} />

        <section className="checkin-section">
          <h2>{copy.sleepTitle}</h2>
          <Slider label={copy.sleepLabel} max={12} step={0.5} value={sleepHours} onChange={setSleepHours} />
        </section>

        <section className="checkin-section">
          <h2>{copy.screenTitle}</h2>
          <div className="time-inputs">
            <NumberField label={copy.hours} max={15} value={screenHours} onChange={setScreenHours} />
            <NumberField label={copy.minutes} max={59} value={screenMinutes} onChange={setScreenMinutes} />
          </div>
        </section>

        <section className="checkin-section">
          <h2>{copy.scrollTitle}</h2>
          <OptionRow options={localizeScroll(language)} selected={scrolling.id} onSelect={(id) => {
            const next = scrollOptions.find((option) => option.id === id);
            if (next) setScrolling(next);
          }} />
        </section>

        <button className="primary-action done-action" disabled={isDone} onClick={finish} type="button">
          {isDone ? <span className="done-pulse"><span>✓</span></span> : copy.done}
        </button>
      </section>
    </main>
  );
}

function OptionRow<T extends string>({ onSelect, options, selected }: {
  onSelect: (id: T) => void;
  options: Array<{ id: T; label: string }>;
  selected: T;
}) {
  return (
    <div className="quick-grid">
      {options.map((option) => (
        <button className={option.id === selected ? 'quick-button active' : 'quick-button'} key={option.id} onClick={() => onSelect(option.id)} type="button">
          {option.label}
        </button>
      ))}
    </div>
  );
}

function NumberField({ label, max, onChange, value }: { label: string; max: number; onChange: (value: number) => void; value: number }) {
  return (
    <label className="number-field">
      <span>{label}</span>
      <input max={max} min={0} onChange={(event) => onChange(Number(event.target.value))} type="number" value={value} />
    </label>
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
      <strong>{value.toLocaleString('en-US')}h</strong>
      <input max={max} min={0} onChange={(event) => onChange(Number(event.target.value))} step={step} type="range" value={value} />
    </label>
  );
}
