import { useEffect, useState } from 'react';
import type { BrainZone } from '../../lib/brainLogic';
import type { Language } from '../../lib/language';
import { BreathTrainer } from './BreathTrainer';
import { ReplaceScrollPanel } from './ReplaceScrollPanel';
import { getMemoryCopy } from './trainingCopy';

const colors = [
  { name: 'КРАСНЫЙ', value: '#ff0055' },
  { name: 'СИНИЙ', value: '#00f0ff' },
  { name: 'ЖЁЛТЫЙ', value: '#ffd700' },
  { name: 'ЗЕЛЁНЫЙ', value: '#00ff88' },
];

type Props = {
  language: Language;
  zone: BrainZone;
};

export function TrainingPanel({ language, zone }: Props) {
  const zoneExercise = getZoneExercise(zone, language);

  return (
    <div className="exercises-stack">
      <BreathTrainer language={language} />
      {zoneExercise}
    </div>
  );
}

function getZoneExercise(zone: BrainZone, language: Language) {
  if (zone === 'hippocampus') return <MemoryGrid language={language} />;
  if (zone === 'limbic') return <ReplaceScrollPanel language={language} />;
  return <StroopTest language={language} />;
}

function StroopTest({ language }: { language: Language }) {
  const [round, setRound] = useState(() => createRound());
  const [score, setScore] = useState(0);
  const copy = language === 'eng'
    ? {
        feedback: 'Choose the ink color, not the word.',
        late: 'Too slow. New round.',
        no: 'The brain followed the word',
        score: 'Score',
        title: 'Stroop test',
        yes: 'Correct',
      }
    : {
        feedback: 'Выбери цвет краски, не слово.',
        late: 'Слишком долго. Новый раунд.',
        no: 'Мозг повёлся на слово',
        score: 'Очки',
        title: 'Тест Струпа',
        yes: 'Верно',
      };
  const [feedback, setFeedback] = useState(copy.feedback);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setFeedback(copy.late);
      setRound(createRound());
    }, 2000);
    return () => window.clearTimeout(id);
  }, [copy.late, round]);

  function answer(value: string) {
    const ok = value === round.ink.value;
    setScore((current) => ok ? current + 1 : Math.max(0, current - 1));
    setFeedback(ok ? copy.yes : copy.no);
    navigator.vibrate?.(ok ? 35 : [20, 40, 20]);
    setRound(createRound());
  }

  return (
    <section className="training-panel">
      <p className="eyebrow">{language === 'eng' ? 'PFC training' : 'Тренировка ПФК'}</p>
      <h2>{copy.title}</h2>
      <div className="score-line">{copy.score}: {score}</div>
      <div className="stroop-word" style={{ color: round.ink.value }}>{round.word.name}</div>
      <div className="stroop-buttons">
        {colors.map((color) => (
          <button key={color.name} onClick={() => answer(color.value)} style={{ borderColor: color.value }} type="button">
            {color.name}
          </button>
        ))}
      </div>
      <p>{feedback}</p>
    </section>
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
      <p className="eyebrow">Гиппокамп</p>
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

function createRound() {
  const word = colors[Math.floor(Math.random() * colors.length)];
  let ink = colors[Math.floor(Math.random() * colors.length)];
  if (ink.name === word.name) ink = colors[(colors.indexOf(ink) + 1) % colors.length];
  return { ink, word };
}

function shuffle(items: number[]) {
  return items.sort(() => Math.random() - 0.5);
}
