import { createContext, useContext, useMemo, useState } from 'react';
import {
  type AppCategory,
  type BrainState,
  type Symptom,
  calculateCheckInState,
} from '../lib/brainLogic';

type CheckInInput = {
  appTypes: AppCategory[];
  screenTime: number;
  sleepHours: number;
  symptoms: Symptom[];
};

type BrainProfile = {
  input: CheckInInput;
  state: BrainState;
};

type BrainStateContextValue = {
  profile: BrainProfile | null;
  saveCheckIn: (input: CheckInInput) => BrainState;
};

const storageKey = 'synap.brainProfile';
const BrainStateContext = createContext<BrainStateContextValue | null>(null);

export function BrainStateProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<BrainProfile | null>(() => loadProfile());

  const value = useMemo<BrainStateContextValue>(() => ({
    profile,
    saveCheckIn(input) {
      const state = calculateCheckInState(
        input.sleepHours,
        input.screenTime,
        input.appTypes,
        input.symptoms,
      );
      const nextProfile = { input, state };
      setProfile(nextProfile);
      localStorage.setItem(storageKey, JSON.stringify(nextProfile));
      return state;
    },
  }), [profile]);

  return (
    <BrainStateContext.Provider value={value}>
      {children}
    </BrainStateContext.Provider>
  );
}

export function useBrainState() {
  const value = useContext(BrainStateContext);
  if (!value) throw new Error('useBrainState must be used inside BrainStateProvider');
  return value;
}

function loadProfile() {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? (JSON.parse(raw) as BrainProfile) : null;
  } catch {
    return null;
  }
}

export type { CheckInInput };
