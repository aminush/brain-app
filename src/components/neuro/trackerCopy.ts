import type { Language } from '../../lib/language';

export function getTrackerCopy(language: Language) {
  return language === 'eng' ? en : ru;
}

const en = {
  bestDay: 'Best day',
  biggestTrigger: 'Your biggest trigger',
  focus: 'Focus',
  focusImproved: 'Your focus improved',
  focusShort: 'Focus',
  nextExperiment: 'Experiment for next week: reduce late-night scrolling by 20 minutes.',
  onScreen: 'on screen',
  screenShort: 'Screen',
  screenTime: 'Screen time',
  sleep: 'Sleep',
  sleepInsight: 'You focus better on days when you sleep 7+ hours.',
  sleepShort: 'Sleep',
  spent: 'You spent',
  strongestHabit: 'Your strongest habit',
  tracker: 'Tracker',
  week: 'Your week',
};

const ru = {
  ...en,
  bestDay: 'Лучший день',
  biggestTrigger: 'Главный триггер',
  focus: 'Фокус',
  focusImproved: 'Фокус улучшился',
  nextExperiment: 'Эксперимент на следующую неделю: сократить ночной скроллинг на 20 минут.',
  onScreen: 'в экране',
  screenTime: 'Экранное время',
  sleep: 'Сон',
  sleepInsight: 'В дни со сном 7+ часов фокус лучше.',
  spent: 'Ты провела',
  strongestHabit: 'Самая сильная привычка',
  tracker: 'Трекер',
  week: 'Твоя неделя',
};
