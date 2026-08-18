import { useState } from 'react';
import type { CheckInInput } from '../../context/BrainStateContext';
import type { AppCategory, Symptom } from '../../lib/brainLogic';
import type { Language } from '../../lib/language';
import { MultiSelect } from './MultiSelect';
import {
  distractionOptions,
  goalOptions,
  onboardingCopy,
  translateDistractions,
  translateGoals,
} from './onboardingQuizCopy';

type Props = {
  language: Language;
  onComplete: (input: CheckInInput) => void;
};

export function OnboardingQuizScreen({ language, onComplete }: Props) {
  const [appTypes, setAppTypes] = useState<AppCategory[]>(['shortVideo']);
  const [selectedGoal, setSelectedGoal] = useState('Focus');
  const [isLoadingPlan, setIsLoadingPlan] = useState(false);
  const copy = onboardingCopy[language];
  const options = language === 'eng' ? distractionOptions : translateDistractions();
  const goals = language === 'eng' ? goalOptions : translateGoals();

  function startPlan() {
    setIsLoadingPlan(true);
    window.setTimeout(() => onComplete(buildInput(appTypes, selectedGoal)), 900);
  }

  if (isLoadingPlan) {
    return (
      <main className="neuro-shell checkin-shell">
        <section className="checkin-panel plan-loading">
          <div className="plan-loader" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <h1>{copy.loadingTitle}</h1>
          <p className="hint">{copy.loadingText}</p>
        </section>
      </main>
    );
  }

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
            {goals.map((goal) => (
              <button
                className={selectedGoal === goal.value ? 'choice-pill active' : 'choice-pill'}
                key={goal.value}
                onClick={() => setSelectedGoal(goal.value)}
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
        <button className="primary-action" onClick={startPlan} type="button">
          {copy.startPlan}
        </button>
      </section>
    </main>
  );
}

function buildInput(appTypes: AppCategory[], selectedGoal: string): CheckInInput {
  return {
    appTypes,
    screenTime: 5.2,
    sleepHours: selectedGoal === 'Recovery' ? 6.5 : 7.5,
    symptoms: mapSymptoms(appTypes, selectedGoal),
  };
}

function mapSymptoms(appTypes: AppCategory[], selectedGoal: string): Symptom[] {
  const symptoms = new Set<Symptom>();
  if (appTypes.includes('shortVideo')) symptoms.add('stuckPhone');
  if (appTypes.includes('messages')) symptoms.add('gadgetFatigue');
  if (appTypes.includes('search') || selectedGoal === 'Focus') symptoms.add('distracted');
  if (selectedGoal === 'Recovery' || selectedGoal === 'Memory') symptoms.add('fog');
  return Array.from(symptoms).slice(0, 3);
}
