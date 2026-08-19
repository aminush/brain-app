import { useState } from 'react';
import type { Language } from '../../lib/language';
import { getScienceArticles, type ScienceArticle } from '../../lib/scienceArticles';

type Props = {
  language: Language;
};

export function SciencePanel({ language }: Props) {
  const [active, setActive] = useState<ScienceArticle | null>(null);
  const articles = getScienceArticles(language);
  const copy = language === 'eng' ? en : ru;

  return (
    <section className="science-panel">
      <p className="eyebrow">{copy.science}</p>
      <h2>{copy.title}</h2>
      <div className="science-grid">
        {articles.map((article) => (
          <button className="science-card" key={article.title} onClick={() => setActive(article)} type="button">
            <h3>{article.title}</h3>
            <p>{article.sections[0].body}</p>
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
            {active.sections.map(({ title, body }) => (
              <section key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </section>
            ))}
            {active.proof && (
              <div className="proof-box">
                <strong>{copy.source}</strong>
                <p>{active.proof}</p>
              </div>
            )}
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
};

const ru = {
  science: 'Наука',
  source: 'Источник',
  title: 'Сначала понять, потом применить',
};
