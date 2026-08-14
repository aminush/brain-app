type TrackerEntry = {
  date: string;
  health: number;
  screenTime: number;
  steps: number;
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
  return value.filter(isTrackerEntry);
}

function isTrackerEntry(value: unknown): value is TrackerEntry {
  if (typeof value !== 'object' || value === null) return false;
  const entry = value as Record<string, unknown>;
  return (
    typeof entry.date === 'string'
    && typeof entry.health === 'number'
    && typeof entry.screenTime === 'number'
    && typeof entry.steps === 'number'
  );
}

export type { TrackerEntry };
