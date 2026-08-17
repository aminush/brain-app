import type { CheckInInput } from '../context/BrainStateContext';
import type { Symptom } from './brainTypes';
import type { ScreenTimeResult } from './screenTimeAi';

const fallbackInput: CheckInInput = {
  appTypes: [],
  screenTime: 6,
  sleepHours: 7,
  steps: 0,
  symptoms: [],
};

export function createScreenshotCheckInInput(
  input: CheckInInput | undefined,
  result: ScreenTimeResult,
): CheckInInput {
  const base = input ?? fallbackInput;

  return {
    ...base,
    appTypes: Array.from(new Set([...base.appTypes, ...result.appTypes])),
    screenInsight: result,
    screenTime: result.screenTime,
    symptoms: Array.from(new Set<Symptom>([
      ...base.symptoms,
      'gadgetFatigue',
      'stuckPhone',
    ])).slice(0, 3),
  };
}
