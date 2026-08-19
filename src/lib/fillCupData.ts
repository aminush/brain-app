export type CupId = 'classic' | 'cosmic' | 'striped' | 'gold' | 'cyber' | 'galaxy';

export type CupQuest = {
  id: string;
  text: string;
  zone: string;
};

export type CupConfig = {
  id: CupId;
  name: string;
  reward: number;
  unlockXP: number;
  sprite: number;
  quests: CupQuest[];
};

const grounding = [
  quest('water', 'Выпей стакан воды без телефона в руках — смотри в окно 2 минуты', 'Амигдала / Детокс'),
  quest('blue', 'Найди вокруг 5 предметов синего цвета и назови их', 'Гиппокамп / Заземление'),
];

const creative = [
  quest('ideas', 'Набросай 3 быстрые идеи на бумаге за 120 секунд', 'ПФК / Креатив'),
  quest('song', 'Включи любимый трек и прослушай его от начала до конца, не отвлекаясь', 'Лимбическая система'),
];

const physical = [
  quest('squats', 'Сделай 15 приседаний или лёгкую растяжку', 'Физический дофамин'),
];

export const CUPS: CupConfig[] = [
  { id: 'classic', name: 'Классическая синяя', reward: 75, unlockXP: 0, sprite: 0, quests: grounding },
  { id: 'cosmic', name: 'Космическая', reward: 75, unlockXP: 0, sprite: 5, quests: creative },
  { id: 'striped', name: 'Полосатая', reward: 75, unlockXP: 0, sprite: 2, quests: physical },
  {
    id: 'gold', name: 'Золотая Чашка Потока', reward: 75, unlockXP: 150, sprite: 1,
    quests: [
      quest('read', '10 минут читай без гаджетов и уведомлений', 'ПФК / Глубокий фокус'),
      quest('plan', 'Напиши план дня на бумаге и выбери один главный шаг', 'ПФК / Планирование'),
    ],
  },
  {
    id: 'cyber', name: 'Неоновая Кибер-Чашка', reward: 75, unlockXP: 300, sprite: 4,
    quests: [
      quest('walk', 'Прогуляйся 15 минут без телефона и наушников', 'Лимбическая система / Детокс'),
      quest('ground-54321', 'Назови 5 вещей, которые видишь, 4 ощущения, 3 звука, 2 запаха и 1 вкус', 'Амигдала / 5-4-3-2-1'),
    ],
  },
  {
    id: 'galaxy', name: 'Таинственная Чашка Галактики', reward: 150, unlockXP: 500, sprite: 3,
    quests: [
      quest('silence', 'Проведи 20 минут в тишине и запиши одну важную мысль', 'Редкий квест / Ясность'),
      quest('memory-map', 'Нарисуй по памяти карту мест, где ты был сегодня', 'Редкий квест / Гиппокамп'),
    ],
  },
];

function quest(id: string, text: string, zone: string): CupQuest {
  return { id, text, zone };
}
