import type { TrackerEntry } from './tracker';

export function buildWeeklyReport(entries: TrackerEntry[]) {
  const splitAt = Math.ceil(entries.length / 2);
  const previous = entries.slice(0, splitAt);
  const current = entries.slice(splitAt);
  const best = entries.slice().sort((a, b) => b.health - a.health)[0];

  return {
    bestDay: best ? formatDay(best.date, 0) : 'Thursday',
    biggestTrigger: best?.screenInsight?.biggestTrigger.split(' - ')[0] ?? 'Short-form video',
    currentFocus: average(current.map((item) => item.health)),
    currentScreen: average(current.map((item) => item.screenTime)),
    currentSleep: average(current.map((item) => item.sleepHours)),
    previousFocus: average(previous.map((item) => item.health)),
    previousScreen: average(previous.map((item) => item.screenTime)),
    previousSleep: average(previous.map((item) => item.sleepHours)),
    totalScreenTime: entries.reduce((sum, item) => sum + item.screenTime, 0),
  };
}

export function padWeek(entries: TrackerEntry[]) {
  const sorted = entries.slice(-7);
  const empty = Array.from({ length: Math.max(0, 7 - sorted.length) }, (_, index) => ({
    date: `empty-${index}`,
    health: 0,
    screenTime: 0,
    sleepHours: 0,
    steps: 0,
  }));
  return [...empty, ...sorted];
}

export function formatDay(date: string, index: number) {
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  if (date.startsWith('empty')) return weekDays[index] ?? '';
  return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(date));
}

export function formatHours(hours: number) {
  const minutes = Math.round(hours * 60);
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}

export function formatMinuteChange(hours: number) {
  const minutes = Math.round(Math.abs(hours) * 60);
  return `${hours >= 0 ? '↑' : '↓'} ${minutes} min`;
}

export function formatPercentChange(current: number, previous: number, lowerIsBetter = false) {
  if (!previous) return '0%';
  const raw = ((current - previous) / previous) * 100;
  const value = lowerIsBetter ? -raw : raw;
  return `${value >= 0 ? '↑' : '↓'} ${Math.abs(Math.round(value))}%`;
}

function average(values: number[]) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}
