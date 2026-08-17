import { useState } from 'react';
import type { Language } from '../../lib/language';

const articles = [
  {
    action: 'Keep short-form video out of your last hour before sleep.',
    proof: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11236742/',
    read: '2 min read',
    title: 'Why your brain wants to scroll',
    sections: [
      ['🧠 What happens', 'Fast rewards train the brain to expect constant novelty. Long tasks can start feeling too slow.'],
      ['📱 Why short videos are so engaging', 'The next clip is unpredictable, so curiosity keeps asking for one more swipe.'],
      ['💡 What you can do', 'Add friction: move the app away from your first screen.'],
    ],
  },
  {
    action: 'Try a 20-minute no-phone block before homework.',
    proof: 'https://www.science.org/doi/10.1126/science.1207745',
    read: '2 min read',
    title: 'Why focus feels fragile',
    sections: [
      ['🧠 What happens', 'When information is always searchable, the brain may remember the path more than the detail.'],
      ['📱 Why apps make it harder', 'Switching between feeds and tasks keeps resetting attention.'],
      ['💡 What you can do', 'Put one task on screen and write the next tiny step on paper.'],
    ],
  },
  {
    action: 'Aim for 7+ hours tonight and compare tomorrow’s focus.',
    proof: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4286245/',
    read: '2 min read',
    title: 'Sleep is focus training',
    sections: [
      ['🧠 What happens', 'Less sleep makes the prefrontal cortex worse at calming emotional signals.'],
      ['📱 Why nights matter', 'Late scrolling delays the moment your brain can downshift.'],
      ['💡 What you can do', 'Charge the phone away from bed for one night.'],
    ],
  },
];

type Props = {
  language: Language;
};

export function SciencePanel({ language }: Props) {
  const [active, setActive] = useState<(typeof articles)[number] | null>(null);
  const copy = language === 'eng' ? en : ru;

  return (
    <section className="science-panel">
      <p className="eyebrow">{copy.science}</p>
      <h2>{copy.title}</h2>
      <div className="science-grid">
        {articles.map((article) => (
          <button className="science-card" key={article.title} onClick={() => setActive(article)} type="button">
            <h3>{article.title}</h3>
            <p>{article.sections[0][1]}</p>
            <span>{article.read}</span>
          </button>
        ))}
      </div>
      {active && (
        <div className="modal-backdrop">
          <article className="article-reader">
            <button className="icon-button" onClick={() => setActive(null)} type="button">×</button>
            <p className="eyebrow">{active.read}</p>
            <h2>{active.title}</h2>
            {active.sections.map(([title, body]) => (
              <section key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </section>
            ))}
            <div className="proof-box">
              <strong>{copy.source}</strong>
              <p>{active.proof}</p>
            </div>
            <button className="primary-action" onClick={() => setActive(null)} type="button">
              {copy.tryThis} {active.action}
            </button>
          </article>
        </div>
      )}
    </section>
  );
}

const en = {
  science: 'Science',
  source: 'Source',
  title: 'Learn, then apply',
  tryThis: 'Try this →',
};

const ru = {
  science: 'Наука',
  source: 'Источник',
  title: 'Узнай и примени',
  tryThis: 'Попробуй →',
};
