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
  text: 'Inhale, hold, exhale, hold. Repeat for 2 minutes.',
  title: 'Box breathing',
  zone: 'Amygdala',
};

const breathRu = {
  text: 'Вдох, пауза, выдох, пауза. Повтори цикл 2 минуты.',
  title: 'Дыхание по квадрату',
  zone: 'Амигдала',
};
