import type { Language } from '../../lib/language';

export function getMemoryCopy(language: Language) {
  return language === 'eng' ? memoryEn : memoryRu;
}

export function getBreathCopy(language: Language) {
  return language === 'eng' ? breathEn : breathRu;
}

const memoryEn = {
  miss: 'Miss. Try again.',
  ready: 'Press start and remember the order.',
  repeat: 'Now repeat the order.',
  start: 'Start',
  title: 'Memory grid',
  watch: 'Watch carefully.',
  win: 'Nice. Your hippocampus woke up.',
};

const memoryRu = {
  miss: 'Ошибка. Попробуй ещё раз.',
  ready: 'Нажми старт и запомни порядок.',
  repeat: 'Теперь повтори порядок.',
  start: 'Старт',
  title: 'Сетка памяти',
  watch: 'Смотри внимательно.',
  win: 'Отлично, гиппокамп ожил.',
};

const breathEn = {
  text: 'Follow the outline: inhale 4, hold 4, exhale 4, hold 4. One full square takes 16 seconds.',
  title: '4-4-4-4 breathing',
  zone: 'Amygdala',
};

const breathRu = {
  text: 'Следуй за контуром: вдох 4, пауза 4, выдох 4, пауза 4. Один квадрат длится 16 секунд.',
  title: 'Дыхание 4-4-4-4',
  zone: 'Амигдала',
};
