import type { HabitTrack } from '../../lib/habitTracks';
import type { TrackProgress } from '../../lib/habitProgress';

type Props = {
  activeDay: number;
  progress: TrackProgress;
  track: HabitTrack;
  onSelectDay: (day: number) => void;
};

export function HabitDayTimeline({ activeDay, progress, track, onSelectDay }: Props) {
  return (
    <div className="habit-timeline">
      {track.days.map((item) => {
        const completed = progress.completedDays.includes(item.day);
        const locked = item.day > progress.currentDay && !completed;
        const current = item.day === activeDay;

        return (
          <button
            className={[
              'habit-day-dot',
              completed ? 'complete' : '',
              current ? 'current' : '',
              locked ? 'locked' : '',
            ].filter(Boolean).join(' ')}
            disabled={locked}
            key={item.day}
            onClick={() => onSelectDay(item.day)}
            type="button"
          >
            <span>{completed ? '✓' : locked ? '🔒' : item.day}</span>
            <small>Day {item.day}</small>
          </button>
        );
      })}
    </div>
  );
}
