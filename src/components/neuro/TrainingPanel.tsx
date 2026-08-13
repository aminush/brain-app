import type { BrainZone } from '../../lib/brainLogic';

type Props = {
  zone: BrainZone;
};

export function TrainingPanel({ zone }: Props) {
  const training = getTraining(zone);
  return (
    <section className="training-panel">
      <p className="eyebrow">Авто-тренировка</p>
      <h2>{training.title}</h2>
      <p>{training.description}</p>
      <div className={training.className}>
        {training.items.map((item) => <span key={item}>{item}</span>)}
      </div>
      <button className="primary-action" type="button">Начать тренировку</button>
    </section>
  );
}

function getTraining(zone: BrainZone) {
  if (zone === 'hippocampus') {
    return {
      className: 'memory-grid',
      description: 'Запомни порядок подсвеченных клеток 3x3 и повтори его.',
      items: Array.from({ length: 9 }, (_, index) => String(index + 1)),
      title: 'Сетка памяти',
    };
  }
  if (zone === 'amygdala') {
    return {
      className: 'breath-box',
      description: 'Дыхание по квадрату 4-4-4-4 снижает кортизоловый шум.',
      items: ['Вдох', 'Пауза', 'Выдох', 'Пауза'],
      title: 'Дыхание по квадрату',
    };
  }
  return {
    className: 'stroop-row',
    description: 'Выбирай цвет шрифта слова, а не значение слова.',
    items: ['Красный', 'Синий', 'Жёлтый'],
    title: zone === 'pfc' ? 'Тест Струпа' : 'Мотивационный запуск',
  };
}
