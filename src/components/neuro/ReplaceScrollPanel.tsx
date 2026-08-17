import { useState } from 'react';
import type { Language } from '../../lib/language';

const swaps = ['2-minute walk', 'cold water reset', 'one song tidy-up', 'message a friend'];

type Props = {
  language: Language;
};

export function ReplaceScrollPanel({ language }: Props) {
  const [choice, setChoice] = useState(swaps[0]);
  const copy = language === 'eng' ? en : ru;

  return (
    <section className="training-panel">
      <p className="eyebrow">Replace the scroll</p>
      <h2>{copy.title}</h2>
      <div className="quick-grid">
        {swaps.map((swap) => (
          <button className={choice === swap ? 'quick-button active' : 'quick-button'} key={swap} onClick={() => setChoice(swap)} type="button">
            {swap}
          </button>
        ))}
      </div>
      <p>{copy.before} <strong>{choice}</strong> {copy.after}</p>
    </section>
  );
}

const en = {
  after: 'before opening the feed.',
  before: 'When the urge to scroll hits, do',
  title: 'Pick a tiny swap',
};

const ru = {
  after: 'перед тем, как открыть ленту.',
  before: 'Когда хочется скроллить, сделай',
  title: 'Выбери маленькую замену',
};
