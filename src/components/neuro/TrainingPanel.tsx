import { useState } from 'react';
import type { BrainZone } from '../../lib/brainLogic';
import type { Language } from '../../lib/language';
import { BreathTrainer } from './BreathTrainer';
import { FillYourCupWidget } from './FillYourCupWidget';
import { getMemoryCopy } from './trainingCopy';

type Props = {
  language: Language;
  zone: BrainZone;
};

export function TrainingPanel({ language, zone }: Props) {
  return (
    <div className="exercises-stack">
      <FillYourCupWidget language={language} />
      <BreathTrainer language={language} />
      {zone === 'hippocampus' && <MemoryGrid language={language} />}
    </div>
  );
}

function MemoryGrid({ language }: { language: Language }) {
  const copy = getMemoryCopy(language);
  const [sequence, setSequence] = useState<number[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [input, setInput] = useState<number[]>([]);
  const [status, setStatus] = useState(copy.ready);

  function start() {
    const next = shuffle(Array.from({ length: 9 }, (_, index) => index)).slice(0, 4);
    setSequence(next);
    setInput([]);
    setStatus(copy.watch);
    next.forEach((cell, index) => {
      window.setTimeout(() => setActive(cell), index * 650);
      window.setTimeout(() => setActive(null), index * 650 + 380);
    });
    window.setTimeout(() => setStatus(copy.repeat), next.length * 650);
  }

  function pick(cell: number) {
    if (!sequence.length || status !== copy.repeat) return;
    const nextInput = [...input, cell];
    setInput(nextInput);
    const ok = sequence[nextInput.length - 1] === cell;
    navigator.vibrate?.(ok ? 25 : [20, 40, 20]);
    if (!ok) {
      setStatus(copy.miss);
      return;
    }
    if (nextInput.length === sequence.length) setStatus(copy.win);
  }

  return (
    <section className="training-panel">
      <p className="eyebrow">{language === 'eng' ? 'Hippocampus' : 'Гиппокамп'}</p>
      <h2>{copy.title}</h2>
      <div className="memory-grid">
        {Array.from({ length: 9 }, (_, cell) => (
          <button className={active === cell ? 'active' : ''} key={cell} onClick={() => pick(cell)} type="button">
            {cell + 1}
          </button>
        ))}
      </div>
      <p>{status}</p>
      <button className="primary-action" onClick={start} type="button">{copy.start}</button>
    </section>
  );
}

function shuffle(items: number[]) {
  return items.sort(() => Math.random() - 0.5);
}
