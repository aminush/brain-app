import { useState } from 'react';

const steps = [
  { count: 5, label: 'вещей, которые видишь' },
  { count: 4, label: 'ощущения, которые чувствуешь телом' },
  { count: 3, label: 'звука вокруг' },
  { count: 2, label: 'запаха или вкуса' },
  { count: 1, label: 'глубокий вдох' },
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function JournalModal({ isOpen, onClose }: Props) {
  const [step, setStep] = useState(0);
  const [notes, setNotes] = useState<string[]>(Array(steps.length).fill(''));
  if (!isOpen) return null;

  const current = steps[step];
  const isDone = step === steps.length - 1;

  return (
    <div className="modal-backdrop">
      <section className="grounding-modal">
        <p className="eyebrow">Метод 5-4-3-2-1</p>
        <h2>{current.count} {current.label}</h2>
        <div className="grounding-progress">
          {steps.map((item, index) => (
            <span className={index <= step ? 'active' : ''} key={item.label} />
          ))}
        </div>
        <textarea
          onChange={(event) => setNotes(updateNote(notes, step, event.target.value))}
          placeholder="Напиши здесь..."
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
          {isDone ? 'Завершить' : 'Дальше'}
        </button>
      </section>
    </div>
  );
}

function updateNote(notes: string[], index: number, value: string) {
  return notes.map((note, noteIndex) => noteIndex === index ? value : note);
}
