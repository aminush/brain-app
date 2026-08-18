import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import type { Language } from '../../lib/language';

type BreathId = 'box' | 'sleep';

type BreathExercise = {
  id: BreathId;
  title: string;
  description: string;
  phases: { label: string; seconds: number }[];
  cycleText: string;
};

type Props = {
  language: Language;
};

const exercises: Record<Language, BreathExercise[]> = {
  eng: [
    {
      id: 'box',
      title: '4-4-4-4 breathing',
      description: 'A steady rhythm for calm and focus.',
      phases: [
        { label: 'Inhale', seconds: 4 },
        { label: 'Hold', seconds: 4 },
        { label: 'Exhale', seconds: 4 },
        { label: 'Hold', seconds: 4 },
      ],
      cycleText: 'One cycle takes 16 seconds.',
    },
    {
      id: 'sleep',
      title: '4-7-8 breathing',
      description: 'For insomnia and anxiety.',
      phases: [
        { label: 'Inhale', seconds: 4 },
        { label: 'Hold', seconds: 7 },
        { label: 'Exhale through your mouth', seconds: 8 },
      ],
      cycleText: 'Repeat the cycle 4 times.',
    },
  ],
  рус: [
    {
      id: 'box',
      title: 'Дыхание 4–4–4–4',
      description: 'Ровный ритм для спокойствия и фокуса.',
      phases: [
        { label: 'Вдох', seconds: 4 },
        { label: 'Задержка', seconds: 4 },
        { label: 'Выдох', seconds: 4 },
        { label: 'Задержка', seconds: 4 },
      ],
      cycleText: 'Один цикл длится 16 секунд.',
    },
    {
      id: 'sleep',
      title: 'Дыхание «4–7–8»',
      description: 'От бессонницы и тревоги.',
      phases: [
        { label: 'Вдох', seconds: 4 },
        { label: 'Задержка', seconds: 7 },
        { label: 'Выдох ртом', seconds: 8 },
      ],
      cycleText: 'Повторите цикл 4 раза.',
    },
  ],
};

export function BreathTrainer({ language }: Props) {
  const [activeId, setActiveId] = useState<BreathId | null>(null);
  const options = exercises[language];
  const activeExercise = options.find((exercise) => exercise.id === activeId);

  return (
    <section className="training-panel breath-panel">
      <p className="eyebrow">{language === 'eng' ? 'Breathing exercises' : 'Дыхательные упражнения'}</p>
      <h2>{language === 'eng' ? 'Choose a breathing rhythm' : 'Выберите технику дыхания'}</h2>

      <div className="breath-choice-grid">
        {options.map((exercise) => (
          <button
            className={activeId === exercise.id ? 'breath-choice active' : 'breath-choice'}
            key={exercise.id}
            onClick={() => setActiveId(exercise.id)}
            type="button"
          >
            <strong>{exercise.title}</strong>
            <span>{exercise.description}</span>
          </button>
        ))}
      </div>

      {activeExercise && <ActiveBreathing exercise={activeExercise} />}
    </section>
  );
}

function ActiveBreathing({ exercise }: { exercise: BreathExercise }) {
  const duration = exercise.phases.reduce((total, phase) => total + phase.seconds, 0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const activePhase = exercise.phases[phaseIndex];
  const phaseKind = activePhase.label.toLowerCase().includes('inhale') || activePhase.label.toLowerCase().includes('вдох')
    ? 'inhale'
    : activePhase.label.toLowerCase().includes('hold') || activePhase.label.toLowerCase().includes('задерж')
      ? 'hold'
      : 'exhale';
  const animationStyle = { '--phase-duration': `${activePhase.seconds}s` } as CSSProperties;

  useEffect(() => {
    setPhaseIndex(0);
  }, [exercise.id]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setPhaseIndex((current) => (current + 1) % exercise.phases.length);
    }, activePhase.seconds * 1000);
    return () => window.clearTimeout(timeout);
  }, [activePhase.seconds, exercise.phases.length, phaseIndex]);

  return (
    <div className="active-breathing">
      <div className={`breathing-circle ${phaseKind}`} style={animationStyle} aria-live="polite">
        <span>{activePhase.label}</span>
        <strong>{activePhase.seconds}</strong>
      </div>
      <div className="breath-phase-list">
        {exercise.phases.map((phase, index) => (
          <div className={phaseIndex === index ? 'breath-phase-row active' : 'breath-phase-row'} key={`${phase.label}-${index}`}>
            <span>{phase.label}</span>
            <strong>{phase.seconds}</strong>
          </div>
        ))}
      </div>
      <p className="breath-cycle-text">{exercise.cycleText} · {duration}s</p>
    </div>
  );
}
