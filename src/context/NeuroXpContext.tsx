import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { CupId } from '../lib/fillCupData';

export type DailyCupPick = {
  completed: boolean;
  cupId: CupId;
  date: string;
  questId: string;
};

type StoredXp = {
  dailyPick: DailyCupPick | null;
  userXP: number;
};

type NeuroXpContextValue = StoredXp & {
  completeDailyCup: (reward: number) => boolean;
  selectDailyCup: (cupId: CupId, questId: string) => boolean;
  userLevel: number;
};

const storageKey = 'unfog.neuroXp';
const NeuroXpContext = createContext<NeuroXpContextValue | null>(null);

export function NeuroXpProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoredXp>(loadXp);
  const todayPick = state.dailyPick?.date === todayKey() ? state.dailyPick : null;

  const value = useMemo<NeuroXpContextValue>(() => ({
    dailyPick: todayPick,
    userLevel: Math.floor(state.userXP / 150) + 1,
    userXP: state.userXP,
    completeDailyCup(reward) {
      if (!todayPick || todayPick.completed) return false;
      const next = { userXP: state.userXP + reward, dailyPick: { ...todayPick, completed: true } };
      saveXp(next, setState);
      return true;
    },
    selectDailyCup(cupId, questId) {
      if (todayPick) return false;
      const next = { ...state, dailyPick: { completed: false, cupId, date: todayKey(), questId } };
      saveXp(next, setState);
      return true;
    },
  }), [state, todayPick]);

  return <NeuroXpContext.Provider value={value}>{children}</NeuroXpContext.Provider>;
}

export function useNeuroXp() {
  const value = useContext(NeuroXpContext);
  if (!value) throw new Error('useNeuroXp must be used inside NeuroXpProvider');
  return value;
}

function saveXp(next: StoredXp, update: (state: StoredXp) => void) {
  update(next);
  localStorage.setItem(storageKey, JSON.stringify(next));
}

function loadXp(): StoredXp {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) as StoredXp : { dailyPick: null, userXP: 0 };
  } catch {
    return { dailyPick: null, userXP: 0 };
  }
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}
