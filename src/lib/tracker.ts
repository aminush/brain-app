import type { ScreenTimeResult } from './screenTimeAi';

type TrackerEntry = {
  date: string;
  health: number;
  screenInsight?: ScreenTimeResult;
  screenTime: number;
  sleepHours: number;
  steps: number;
};

type StoredTrackerEntry = Omit<TrackerEntry, 'sleepHours'> & {
  sleepHours?: number;
};

const trackerKey = 'synap.weeklyTracker';

export function loadTrackerEntries() {
  try {
    const raw = localStorage.getItem(trackerKey);
    return raw ? normalizeEntries(JSON.parse(raw)) : [];
  } catch {
    return [];
  }
}

export function saveTrackerEntry(entry: TrackerEntry) {
  const next = [
    ...loadTrackerEntries().filter((item) => item.date !== entry.date),
    entry,
  ]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-7);

  localStorage.setItem(trackerKey, JSON.stringify(next));
  return next;
}

export function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function normalizeEntries(value: unknown): TrackerEntry[] {
  if (!Array.isArray(value)) return [];
  return value.filter(isStoredEntry).map((entry) => ({
    date: entry.date,
    health: entry.health,
    screenInsight: entry.screenInsight,
    screenTime: entry.screenTime,
    sleepHours: entry.sleepHours ?? 0,
    steps: entry.steps,
  }));
}

function isStoredEntry(value: unknown): value is StoredTrackerEntry {
  if (typeof value !== 'object' || value === null) return false;
  const entry = value as Record<string, unknown>;
  return (
    typeof entry.date === 'string'
    && typeof entry.health === 'number'
    && typeof entry.screenTime === 'number'
    && (typeof entry.sleepHours === 'number' || typeof entry.sleepHours === 'undefined')
    && typeof entry.steps === 'number'
  );
}

export type { TrackerEntry };
