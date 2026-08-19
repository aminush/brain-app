import { useState } from 'react';
import type { Language } from '../../lib/language';

type Props = {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
};

export function JournalModal({ isOpen, language, onClose }: Props) {
  const copy = journalCopy[language];
  const steps = copy.steps;
  const [step, setStep] = useState(0);
  const [notes, setNotes] = useState<string[]>(Array(steps.length).fill(''));
  if (!isOpen) return null;

  const current = steps[step];
  const isDone = step === steps.length - 1;

  return (
    <div className="modal-backdrop">
      <section className="grounding-modal">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h2>{current.count} {current.label}</h2>
        <div className="grounding-progress">
          {steps.map((item, index) => (
            <span className={index <= step ? 'active' : ''} key={item.label} />
          ))}
        </div>
        <textarea
          onChange={(event) => setNotes(updateNote(notes, step, event.target.value))}
          placeholder={copy.placeholder}
          value={notes[step]}
        />
        <button
          className="primary-action"
          onClick={() => {
            if (isDone) {
              setStep(0);
              onClose();
              return;
            }
            setStep((value) => value + 1);
          }}
          type="button"
        >
          {isDone ? copy.finish : copy.next}
        </button>
      </section>
    </div>
  );
}

function updateNote(notes: string[], index: number, value: string) {
  return notes.map((note, noteIndex) => noteIndex === index ? value : note);
}

const journalCopy = {
  eng: {
    eyebrow: '5-4-3-2-1 method',
    finish: 'Finish',
    next: 'Next',
    placeholder: 'Write here...',
    steps: [
      { count: 5, label: 'things you can see' },
      { count: 4, label: 'body sensations you can feel' },
      { count: 3, label: 'sounds around you' },
      { count: 2, label: 'smells or tastes' },
      { count: 1, label: 'deep breath' },
    ],
  },
  рус: {
    eyebrow: 'Метод 5-4-3-2-1',
    finish: 'Завершить',
    next: 'Дальше',
    placeholder: 'Напиши здесь...',
    steps: [
      { count: 5, label: 'вещей, которые видишь' },
      { count: 4, label: 'ощущения, которые чувствуешь телом' },
      { count: 3, label: 'звука вокруг' },
      { count: 2, label: 'запаха или вкуса' },
      { count: 1, label: 'глубокий вдох' },
    ],
  },
} satisfies Record<Language, {
  eyebrow: string;
  finish: string;
  next: string;
  placeholder: string;
  steps: Array<{ count: number; label: string }>;
}>;
