import type { AppCategory } from '../../lib/brainLogic';

const distractionOptions: Array<{ id: AppCategory; label: string }> = [
  { id: 'other', label: 'Distracted' },
  { id: 'shortVideo', label: 'Glued to my phone' },
  { id: 'gaming', label: 'Procrastinating' },
  { id: 'messages', label: 'Burnt out' },
  { id: 'search', label: 'Brain fog' },
];

const goalOptions = [
  { label: 'Focus', value: 'Focus' },
  { label: 'Discipline', value: 'Discipline' },
  { label: 'Recovery', value: 'Recovery' },
  { label: 'Digital reset', value: 'Digital reset' },
  { label: 'Memory', value: 'Memory' },
];

function translateDistractions() {
  return [
    { id: 'other' as AppCategory, label: 'Расфокус' },
    { id: 'shortVideo' as AppCategory, label: 'Залипаю в телефоне' },
    { id: 'gaming' as AppCategory, label: 'Прокрастинирую' },
    { id: 'messages' as AppCategory, label: 'Выгорание' },
    { id: 'search' as AppCategory, label: 'Туман в голове' },
  ];
}

function translateGoals() {
  return [
    { label: 'Фокус', value: 'Focus' },
    { label: 'Дисциплина', value: 'Discipline' },
    { label: 'Восстановление', value: 'Recovery' },
    { label: 'Digital reset', value: 'Digital reset' },
    { label: 'Память', value: 'Memory' },
  ];
}

const onboardingCopy = {
  eng: {
    distractionTitle: 'What best describes your current state?',
    goalTitle: 'What do you want to improve?',
    loadingText: 'Matching your answers with a gentle 7-day track.',
    loadingTitle: 'Building your plan',
    rebootText: "Based on your answers, we'll create a 7-day plan.",
    rebootTitle: 'Your personal reboot',
    startPlan: 'Start my plan',
    stepOne: 'Step 1',
    stepThree: 'Step 3',
    stepTwo: 'Step 2',
  },
  рус: {
    distractionTitle: 'Что лучше всего описывает твоё состояние сейчас?',
    goalTitle: 'Что хочешь улучшить?',
    loadingText: 'Подбираем мягкий 7-дневный трек под твои ответы.',
    loadingTitle: 'Собираем твой план',
    rebootText: 'На основе ответов мы создадим план на 7 дней.',
    rebootTitle: 'Твой личный reboot',
    startPlan: 'Start my plan',
    stepOne: 'Шаг 1',
    stepThree: 'Шаг 3',
    stepTwo: 'Шаг 2',
  },
};

export {
  distractionOptions,
  goalOptions,
  onboardingCopy,
  translateDistractions,
  translateGoals,
};
