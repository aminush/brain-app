import type { HabitTrackId } from './habitTracks';

type TrackProgress = {
  completedDays: number[];
  currentDay: number;
};

type HabitProgressState = {
  lastActiveDate: string;
  streak: number;
  user_progress: Partial<Record<HabitTrackId, TrackProgress>>;
};

const habitProgressKey = 'synap.habitProgress';

function createInitialHabitProgress(): HabitProgressState {
  return {
    lastActiveDate: getTodayDate(),
    streak: 0,
    user_progress: {},
  };
}

function loadHabitProgress(): HabitProgressState {
  try {
    const raw = localStorage.getItem(habitProgressKey);
    return raw ? normalizeHabitProgress(JSON.parse(raw) as HabitProgressState) : createInitialHabitProgress();
  } catch {
    return createInitialHabitProgress();
  }
}

function saveHabitProgress(progress: HabitProgressState) {
  localStorage.setItem(habitProgressKey, JSON.stringify(progress));
}

function toggleDayCompletion(progress: HabitProgressState, trackId: HabitTrackId, dayNumber: number) {
  const track = progress.user_progress[trackId] ?? { completedDays: [], currentDay: 1 };
  const isCompleted = track.completedDays.includes(dayNumber);
  const completedDays = isCompleted
    ? track.completedDays.filter((day) => day !== dayNumber)
    : [...track.completedDays, dayNumber].sort((first, second) => first - second);
  const currentDay = Math.min(7, firstIncompleteDay(completedDays));
  const nextProgress = {
    ...progress,
    lastActiveDate: getTodayDate(),
    streak: Math.max(0, progress.streak + (isCompleted ? -1 : 1)),
    user_progress: {
      ...progress.user_progress,
      [trackId]: { completedDays, currentDay },
    },
  };
  saveHabitProgress(nextProgress);
  return nextProgress;
}

function getTrackProgress(progress: HabitProgressState, trackId: HabitTrackId): TrackProgress {
  return progress.user_progress[trackId] ?? { completedDays: [], currentDay: 1 };
}

function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

function firstIncompleteDay(completedDays: number[]) {
  for (let day = 1; day <= 7; day += 1) {
    if (!completedDays.includes(day)) return day;
  }
  return 7;
}

function normalizeHabitProgress(progress: HabitProgressState): HabitProgressState {
  return {
    lastActiveDate: progress.lastActiveDate || getTodayDate(),
    streak: progress.streak ?? 0,
    user_progress: progress.user_progress ?? {},
  };
}

export {
  createInitialHabitProgress,
  getTrackProgress,
  loadHabitProgress,
  saveHabitProgress,
  toggleDayCompletion,
};
export type { HabitProgressState, TrackProgress };
