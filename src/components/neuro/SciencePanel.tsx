import { useState } from 'react';

const articles = [
  {
    proof: 'Обзор о сне и эмоциях: https://pmc.ncbi.nlm.nih.gov/articles/PMC4286245/',
    read: '2 мин чтения',
    subtitle: 'Почему недосып делает эмоции громче.',
    title: 'Кортизол и Амигдала',
    sections: [
      ['Что происходит', 'Когда сна мало, ПФК хуже тормозит эмоциональные реакции. Амигдала начинает реагировать резче, поэтому тревога и раздражение ощущаются сильнее.'],
      ['Простыми словами', 'Это похоже на машину без хороших тормозов: сигнал тревоги включается быстрее, а выключается медленнее.'],
    ],
  },
  {
    proof: 'Sparrow et al., Science 2011: https://www.science.org/doi/10.1126/science.1207745',
    read: '3 мин чтения',
    subtitle: 'Почему поисковики меняют то, как мы запоминаем.',
    title: 'Цифровая амнезия',
    sections: [
      ['Что происходит', 'Если мозг ожидает, что факт всегда можно найти, он чаще запоминает путь к информации, а не саму информацию.'],
      ['Простыми словами', 'Гиппокамп меньше тренируется удерживать детали, когда телефон всегда играет роль внешней памяти.'],
    ],
  },
  {
    proof: 'EEG-исследование коротких видео: https://pmc.ncbi.nlm.nih.gov/articles/PMC11236742/',
    read: '2 мин чтения',
    subtitle: 'Как бесконечная лента давит на внимание.',
    title: 'Reels и лимбическая система',
    sections: [
      ['Что происходит', 'Короткие видео дают частые быстрые награды. Лимбическая система привыкает к лёгкой стимуляции, а ПФК сложнее держит длинную задачу.'],
      ['Простыми словами', 'После ленты скучная, но важная работа кажется слишком медленной, потому что мозг ждёт быстрый дофаминовый щелчок.'],
    ],
  },
];

export function SciencePanel() {
  const [active, setActive] = useState<(typeof articles)[number] | null>(null);
  return (
    <section className="science-panel">
      <p className="eyebrow">Научная база</p>
      <h2>Почему мозг уходит в туман</h2>
      <div className="science-grid">
        {articles.map((article) => (
          <button className="science-card" key={article.title} onClick={() => setActive(article)} type="button">
            <h3>{article.title}</h3>
            <p>{article.subtitle}</p>
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
            <p>{active.subtitle}</p>
            {active.sections.map(([title, text]) => (
              <section key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </section>
            ))}
            <div className="proof-box">
              <strong>Доказано наукой</strong>
              <p>{active.proof}</p>
            </div>
          </article>
        </div>
      )}
    </section>
  );
}
