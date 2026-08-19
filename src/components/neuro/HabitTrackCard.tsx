import type React from 'react';
import type { HabitTrack } from '../../lib/habitTracks';
import type { TrackProgress } from '../../lib/habitProgress';
import type { Language } from '../../lib/language';

type Props = {
  isActive: boolean;
  language: Language;
  progress: TrackProgress;
  track: HabitTrack;
  onSelect: () => void;
};

export function HabitTrackCard({ isActive, language, progress, track, onSelect }: Props) {
  const completedCount = progress.completedDays.length;
  const progressPercent = Math.round((completedCount / track.days.length) * 100);
  const dayLabel = language === 'eng' ? 'days' : 'дней';

  return (
    <button
      className={isActive ? 'habit-track-card active' : 'habit-track-card'}
      onClick={onSelect}
      style={{ '--track-color': track.color } as React.CSSProperties}
      type="button"
    >
      <span className="habit-track-emoji">{track.emoji}</span>
      <strong>{track.title}</strong>
      <span>{track.description}</span>
      <div className="habit-progress-line">
        <span>{completedCount}/7 {dayLabel}</span>
        <i><b style={{ width: `${progressPercent}%` }} /></i>
      </div>
    </button>
  );
}
