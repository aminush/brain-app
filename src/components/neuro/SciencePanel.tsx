const articles = [
  {
    title: 'Как TikTok и Reels истощают лимбическую систему',
    text: 'Короткие циклы награды перегружают дофаминовые рецепторы и снижают тягу к сложным задачам.',
  },
  {
    title: 'Цифровая амнезия: почему поисковики расслабляют гиппокамп',
    text: 'Когда мозг ожидает внешний поиск, он хуже закрепляет детали в долговременной памяти.',
  },
  {
    title: 'Кортизол и Амигдала: эмоции при недосыпе',
    text: 'Недосып повышает реактивность эмоционального центра и делает стресс более липким.',
  },
];

export function SciencePanel() {
  return (
    <section className="science-panel">
      <p className="eyebrow">Научная база</p>
      <h2>Почему мозг уходит в туман</h2>
      <div className="science-grid">
        {articles.map((article) => (
          <article className="science-card" key={article.title}>
            <h3>{article.title}</h3>
            <p>{article.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
