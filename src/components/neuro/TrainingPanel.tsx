import { useEffect, useState } from 'react';
import type { BrainZone } from '../../lib/brainLogic';

const colors = [
  { name: 'КРАСНЫЙ', value: '#ff0055' },
  { name: 'СИНИЙ', value: '#00f0ff' },
  { name: 'ЖЁЛТЫЙ', value: '#ffd700' },
  { name: 'ЗЕЛЁНЫЙ', value: '#00ff88' },
];

type Props = {
  zone: BrainZone;
};

export function TrainingPanel({ zone }: Props) {
  if (zone === 'hippocampus') return <MemoryGrid />;
  if (zone === 'amygdala') return <BreathTrainer />;
  return <StroopTest />;
}

function StroopTest() {
  const [round, setRound] = useState(() => createRound());
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState('Выбери цвет краски, не слово.');

  useEffect(() => {
    const id = window.setTimeout(() => {
      setFeedback('Слишком долго. Новый раунд.');
      setRound(createRound());
    }, 2000);
    return () => window.clearTimeout(id);
  }, [round]);

  function answer(value: string) {
    const ok = value === round.ink.value;
    setScore((current) => ok ? current + 1 : Math.max(0, current - 1));
    setFeedback(ok ? 'Верно' : 'Мозг повёлся на слово');
    navigator.vibrate?.(ok ? 35 : [20, 40, 20]);
    setRound(createRound());
  }

  return (
    <section className="training-panel">
      <p className="eyebrow">ПФК тренировка</p>
      <h2>Тест Струпа</h2>
      <div className="score-line">Очки: {score}</div>
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

function MemoryGrid() {
  const [sequence, setSequence] = useState<number[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const [input, setInput] = useState<number[]>([]);
  const [status, setStatus] = useState('Нажми старт и запомни порядок.');

  function start() {
    const next = shuffle(Array.from({ length: 9 }, (_, index) => index)).slice(0, 4);
    setSequence(next);
    setInput([]);
    setStatus('Смотри внимательно.');
    next.forEach((cell, index) => {
      window.setTimeout(() => setActive(cell), index * 650);
      window.setTimeout(() => setActive(null), index * 650 + 380);
    });
    window.setTimeout(() => setStatus('Теперь повтори порядок.'), next.length * 650);
  }

  function pick(cell: number) {
    if (!sequence.length || status !== 'Теперь повтори порядок.') return;
    const nextInput = [...input, cell];
    setInput(nextInput);
    const ok = sequence[nextInput.length - 1] === cell;
    navigator.vibrate?.(ok ? 25 : [20, 40, 20]);
    if (!ok) {
      setStatus('Ошибка. Попробуй ещё раз.');
      return;
    }
    if (nextInput.length === sequence.length) setStatus('Отлично, гиппокамп ожил.');
  }

  return (
    <section className="training-panel">
      <p className="eyebrow">Гиппокамп</p>
      <h2>Сетка памяти</h2>
      <div className="memory-grid">
        {Array.from({ length: 9 }, (_, cell) => (
          <button className={active === cell ? 'active' : ''} key={cell} onClick={() => pick(cell)} type="button">
            {cell + 1}
          </button>
        ))}
      </div>
      <p>{status}</p>
      <button className="primary-action" onClick={start} type="button">Старт</button>
    </section>
  );
}

function BreathTrainer() {
  return (
    <section className="training-panel">
      <p className="eyebrow">Амигдала</p>
      <h2>Дыхание по квадрату</h2>
      <div className="breath-box"><span>4</span><span>4</span><span>4</span><span>4</span></div>
      <p>Вдох, пауза, выдох, пауза. Повтори цикл 2 минуты.</p>
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
