import type { AppCategory, Symptom } from '../../lib/brainLogic';
import type { Language } from '../../lib/language';

export const scrollOptions = [
  { apps: [] as AppCategory[], id: 'controlled', label: '🟢 Controlled', symptoms: [] as Symptom[] },
  { apps: ['shortVideo'] as AppCategory[], id: 'some', label: '🟡 Somewhat distracting', symptoms: ['distracted'] as Symptom[] },
  { apps: ['shortVideo'] as AppCategory[], id: 'stuck', label: "🔴 I couldn't stop", symptoms: ['stuckPhone'] as Symptom[] },
  { apps: ['other'] as AppCategory[], id: 'other', label: 'Other', symptoms: ['gadgetFatigue'] as Symptom[] },
];

export function getCheckInCopy(language: Language) {
  return language === 'eng' ? en : ru;
}

export function localizeMoods(language: Language) {
  if (language === 'eng') {
    return [
      { id: 'fog' as Symptom, label: '😵 Overloaded' },
      { id: 'distracted' as Symptom, label: '😐 Normal' },
      { id: 'noMotivation' as Symptom, label: '⚡ Focused' },
      { id: 'gadgetFatigue' as Symptom, label: '😴 Tired' },
    ];
  }

  return [
    { id: 'fog' as Symptom, label: '😵 Перегруз' },
    { id: 'distracted' as Symptom, label: '😐 Нормально' },
    { id: 'noMotivation' as Symptom, label: '⚡ В фокусе' },
    { id: 'gadgetFatigue' as Symptom, label: '😴 Усталость' },
  ];
}

export function localizeScroll(language: Language) {
  if (language === 'eng') return scrollOptions;
  return [
    { id: 'controlled', label: '🟢 Под контролем' },
    { id: 'some', label: '🟡 Немного отвлекало' },
    { id: 'stuck', label: '🔴 Не могла остановиться' },
    { id: 'other', label: 'Другое' },
  ];
}

const en = {
  brainTitle: "How's your brain today?",
  done: 'Done →',
  eyebrow: 'Daily check-in',
  hours: 'Hours',
  minutes: 'Minutes',
  screenTitle: 'Screen time yesterday',
  scrollTitle: 'How was scrolling?',
  sleepLabel: 'Sleep',
  sleepTitle: 'How much did you sleep?',
};

const ru = {
  brainTitle: 'Как мозг сегодня?',
  done: 'Готово →',
  eyebrow: 'Ежедневный чек-ин',
  hours: 'Часы',
  minutes: 'Минуты',
  screenTitle: 'Экранное время вчера',
  scrollTitle: 'Как прошёл скроллинг?',
  sleepLabel: 'Сон',
  sleepTitle: 'Сколько ты спала?',
};
