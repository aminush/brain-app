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

const groundingEn = [
  quest('water', 'Drink a glass of water without holding your phone. Look out the window for 2 minutes.', 'Amygdala / Detox'),
  quest('blue', 'Find 5 blue objects around you and name them.', 'Hippocampus / Grounding'),
];

const creativeEn = [
  quest('ideas', 'Sketch 3 quick ideas on paper in 120 seconds.', 'PFC / Creativity'),
  quest('song', 'Play a favorite track from start to finish without multitasking.', 'Limbic system'),
];

const physicalEn = [
  quest('squats', 'Do 15 squats or a light stretch.', 'Physical dopamine'),
];

const CUPS_EN: CupConfig[] = [
  { id: 'classic', name: 'Classic Blue', reward: 75, unlockXP: 0, sprite: 0, quests: groundingEn },
  { id: 'cosmic', name: 'Cosmic Cup', reward: 75, unlockXP: 0, sprite: 5, quests: creativeEn },
  { id: 'striped', name: 'Striped Cup', reward: 75, unlockXP: 0, sprite: 2, quests: physicalEn },
  {
    id: 'gold', name: 'Golden Flow Cup', reward: 75, unlockXP: 150, sprite: 1,
    quests: [
      quest('read', 'Read for 10 minutes without devices or notifications.', 'PFC / Deep focus'),
      quest('plan', 'Write your day plan on paper and choose one main next step.', 'PFC / Planning'),
    ],
  },
  {
    id: 'cyber', name: 'Neon Cyber Cup', reward: 75, unlockXP: 300, sprite: 4,
    quests: [
      quest('walk', 'Walk for 15 minutes without your phone or headphones.', 'Limbic system / Detox'),
      quest('ground-54321', 'Name 5 things you see, 4 sensations, 3 sounds, 2 smells and 1 taste.', 'Amygdala / 5-4-3-2-1'),
    ],
  },
  {
    id: 'galaxy', name: 'Mystery Galaxy Cup', reward: 150, unlockXP: 500, sprite: 3,
    quests: [
      quest('silence', 'Spend 20 minutes in silence and write down one important thought.', 'Rare quest / Clarity'),
      quest('memory-map', 'Draw from memory a map of places you visited today.', 'Rare quest / Hippocampus'),
    ],
  },
];

export function getCups(language: 'eng' | 'рус') {
  return language === 'eng' ? CUPS_EN : CUPS;
}

function quest(id: string, text: string, zone: string): CupQuest {
  return { id, text, zone };
}
