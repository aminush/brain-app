import { useState } from 'react';
import type { CheckInInput } from '../../context/BrainStateContext';
import type { AppCategory, Symptom } from '../../lib/brainLogic';
import type { Language } from '../../lib/language';
import { MultiSelect } from './MultiSelect';

const distractions: Array<{ id: AppCategory; label: string }> = [
  { id: 'shortVideo', label: '🎬 Short videos' },
  { id: 'gaming', label: '🎮 Gaming' },
  { id: 'messages', label: '💬 Social media' },
  { id: 'search', label: "📚 Can't focus on studying" },
  { id: 'other', label: 'Other' },
];

const goals = [
  { label: 'Focus', value: 'Focus' },
  { label: 'Sleep', value: 'Sleep' },
  { label: 'Screen time', value: 'Screen time' },
  { label: 'Self-control', value: 'Self-control' },
  { label: 'Productivity', value: 'Productivity' },
  { label: 'Other', value: 'Other' },
];

type Props = {
  language: Language;
  onComplete: (input: CheckInInput) => void;
};

export function OnboardingQuizScreen({ language, onComplete }: Props) {
  const [appTypes, setAppTypes] = useState<AppCategory[]>(['shortVideo']);
  const [selectedGoals, setSelectedGoals] = useState<string[]>(['Focus']);
  const copy = language === 'eng' ? en : ru;
  const options = language === 'eng' ? distractions : translateDistractions();
  const goalOptions = language === 'eng' ? goals : translateGoals();

  return (
    <main className="neuro-shell checkin-shell">
      <section className="checkin-panel">
        <p className="eyebrow">{copy.stepOne}</p>
        <h1>{copy.distractionTitle}</h1>
        <section className="checkin-section">
          <MultiSelect limit={3} options={options} selected={appTypes} onChange={setAppTypes} />
        </section>
        <section className="checkin-section">
          <p className="eyebrow">{copy.stepTwo}</p>
          <h2>{copy.goalTitle}</h2>
          <div className="choice-grid">
            {goalOptions.map((goal) => (
              <button
                className={selectedGoals.includes(goal.value) ? 'choice-pill active' : 'choice-pill'}
                key={goal.value}
                onClick={() => setSelectedGoals(toggleGoal(selectedGoals, goal.value))}
                type="button"
              >
                {goal.label}
              </button>
            ))}
          </div>
        </section>
        <section className="checkin-section">
          <p className="eyebrow">{copy.stepThree}</p>
          <h2>{copy.rebootTitle}</h2>
          <p className="hint">{copy.rebootText}</p>
        </section>
        <button className="primary-action" onClick={() => onComplete(buildInput(appTypes, selectedGoals))} type="button">
          {copy.startPlan}
        </button>
      </section>
    </main>
  );
}

function buildInput(appTypes: AppCategory[], selectedGoals: string[]): CheckInInput {
  return {
    appTypes,
    screenTime: 5.2,
    sleepHours: selectedGoals.includes('Sleep') ? 6.5 : 7.5,
    symptoms: mapSymptoms(appTypes, selectedGoals),
  };
}

function mapSymptoms(appTypes: AppCategory[], selectedGoals: string[]): Symptom[] {
  const symptoms = new Set<Symptom>();
  if (appTypes.includes('shortVideo')) symptoms.add('stuckPhone');
  if (appTypes.includes('messages')) symptoms.add('gadgetFatigue');
  if (appTypes.includes('search') || selectedGoals.includes('Focus')) symptoms.add('distracted');
  if (selectedGoals.includes('Sleep')) symptoms.add('fog');
  return Array.from(symptoms).slice(0, 3);
}

function toggleGoal(items: string[], goal: string) {
  if (items.includes(goal)) return items.filter((item) => item !== goal);
  return [...items, goal].slice(0, 2);
}

function translateDistractions() {
  return [
    { id: 'shortVideo' as AppCategory, label: '🎬 Короткие видео' },
    { id: 'gaming' as AppCategory, label: '🎮 Игры' },
    { id: 'messages' as AppCategory, label: '💬 Соцсети' },
    { id: 'search' as AppCategory, label: '📚 Трудно учиться' },
    { id: 'other' as AppCategory, label: 'Другое' },
  ];
}

function translateGoals() {
  return [
    { label: 'Фокус', value: 'Focus' },
    { label: 'Сон', value: 'Sleep' },
    { label: 'Экранное время', value: 'Screen time' },
    { label: 'Самоконтроль', value: 'Self-control' },
    { label: 'Продуктивность', value: 'Productivity' },
    { label: 'Другое', value: 'Other' },
  ];
}

const en = {
  distractionTitle: "What's distracting you most?",
  goalTitle: 'What do you want to improve?',
  rebootText: "Based on your answers, we'll create a 7-day plan.",
  rebootTitle: 'Your personal reboot',
  startPlan: 'Start my plan',
  stepOne: 'Step 1',
  stepThree: 'Step 3',
  stepTwo: 'Step 2',
};

const ru = {
  distractionTitle: 'Что отвлекает тебя больше всего?',
  goalTitle: 'Что хочешь улучшить?',
  rebootText: 'На основе ответов мы создадим план на 7 дней.',
  rebootTitle: 'Твой личный reboot',
  startPlan: 'Start my plan',
  stepOne: 'Шаг 1',
  stepThree: 'Шаг 3',
  stepTwo: 'Шаг 2',
};
