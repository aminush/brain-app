import { useEffect, useState } from 'react';
import { getTrackProgress, loadHabitProgress, toggleDayCompletion } from '../../lib/habitProgress';
import { HABIT_TRACKS, type HabitTrackId } from '../../lib/habitTracks';
import type { Language } from '../../lib/language';
import type { TrackerEntry } from '../../lib/tracker';
import { DailyActionCard } from './DailyActionCard';
import { HabitDayTimeline } from './HabitDayTimeline';
import { HabitTrackCard } from './HabitTrackCard';
import { WeeklyTrackerPanel } from './WeeklyTrackerPanel';

type Props = {
  entries: TrackerEntry[];
  initialTrackId?: HabitTrackId;
  language: Language;
};

export function TrackerPanel({ entries, initialTrackId, language }: Props) {
  const [progress, setProgress] = useState(() => loadHabitProgress());
  const [activeTrackId, setActiveTrackId] = useState<HabitTrackId>(initialTrackId ?? 'focus');
  const activeTrack = HABIT_TRACKS.find((track) => track.id === activeTrackId) ?? HABIT_TRACKS[0];
  const activeProgress = getTrackProgress(progress, activeTrack.id);
  const [activeDay, setActiveDay] = useState(activeProgress.currentDay);
  const [celebratingDay, setCelebratingDay] = useState<number | null>(null);
  const day = activeTrack.days.find((item) => item.day === activeDay) ?? activeTrack.days[0];
  const copy = language === 'eng' ? en : ru;

  useEffect(() => {
    setActiveDay(getTrackProgress(progress, activeTrack.id).currentDay);
  }, [activeTrack.id, progress]);

  useEffect(() => {
    if (initialTrackId) setActiveTrackId(initialTrackId);
  }, [initialTrackId]);

  function completeDay() {
    window.navigator.vibrate?.(40);
    const nextProgress = toggleDayCompletion(progress, activeTrack.id, day.day);
    const nextTrackProgress = getTrackProgress(nextProgress, activeTrack.id);
    setProgress(nextProgress);
    setCelebratingDay(day.day);
    window.setTimeout(() => {
      setCelebratingDay(null);
      setActiveDay(nextTrackProgress.currentDay);
    }, 620);
  }

  return (
    <div className="tracker-stack">
      <section className="habit-panel">
        <header className="habit-header">
          <div>
            <p className="eyebrow">{copy.eyebrow}</p>
            <h2>{copy.title}</h2>
          </div>
          <strong>Current Streak: 🔥 {progress.streak} days</strong>
        </header>
        <div className="habit-track-list">
          {HABIT_TRACKS.map((track) => (
            <HabitTrackCard
              isActive={track.id === activeTrack.id}
              key={track.id}
              progress={getTrackProgress(progress, track.id)}
              track={track}
              onSelect={() => setActiveTrackId(track.id)}
            />
          ))}
        </div>
        <div className={celebratingDay ? 'habit-detail-layout celebrating' : 'habit-detail-layout'}>
          <section className="habit-track-detail">
            <h3>{activeTrack.emoji} {activeTrack.title}</h3>
            <p>{activeTrack.description}</p>
            <HabitDayTimeline
              activeDay={activeDay}
              progress={activeProgress}
              track={activeTrack}
              onSelectDay={setActiveDay}
            />
          </section>
          <DailyActionCard
            day={day}
            isComplete={activeProgress.completedDays.includes(day.day)}
            track={activeTrack}
            onComplete={completeDay}
          />
        </div>
      </section>
      <WeeklyTrackerPanel entries={entries} language={language} />
    </div>
  );
}

const en = {
  eyebrow: '7-day tracks',
  title: 'Habit dashboard',
};

const ru = {
  eyebrow: '7-дневные треки',
  title: 'Трекер привычек',
};
