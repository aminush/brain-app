import type { Language } from '../../lib/language';
import { getBreathCopy } from './trainingCopy';

type Props = {
  language: Language;
};

export function BreathTrainer({ language }: Props) {
  const copy = getBreathCopy(language);

  return (
    <section className="training-panel">
      <p className="eyebrow">{copy.zone}</p>
      <h2>{copy.title}</h2>
      <div className="breathing-square">
        <svg aria-hidden="true" viewBox="0 0 160 160">
          <rect className="breath-square-base" height="120" rx="8" width="120" x="20" y="20" />
          <rect className="breath-square-line" height="120" rx="8" width="120" x="20" y="20" />
        </svg>
        <div className="breath-phase top">Inhale 4</div>
        <div className="breath-phase right">Hold 4</div>
        <div className="breath-phase bottom">Exhale 4</div>
        <div className="breath-phase left">Hold 4</div>
      </div>
      <p>{copy.text}</p>
    </section>
  );
}
