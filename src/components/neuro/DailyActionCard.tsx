import { useState } from 'react';
import type { HabitDay, HabitTrack } from '../../lib/habitTracks';

type Props = {
  day: HabitDay;
  isComplete: boolean;
  track: HabitTrack;
  onComplete: () => void;
};

export function DailyActionCard({ day, isComplete, track, onComplete }: Props) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  return (
    <article className={isComplete ? 'daily-action-card complete' : 'daily-action-card'}>
      <div className="daily-card-top">
        <span style={{ background: track.color }}>{track.emoji}</span>
        <div>
          <p>Day {day.day}</p>
          <h3>{day.title}</h3>
        </div>
      </div>
      <div className="daily-task">
        <span>Task</span>
        <p>{day.task}</p>
      </div>
      <button className="detail-toggle" onClick={() => setIsDetailOpen(!isDetailOpen)} type="button">
        <span>Зачем это нужно?</span>
        <b>{isDetailOpen ? '−' : '+'}</b>
      </button>
      {isDetailOpen && <p className="habit-detail-text">{day.detail}</p>}
      <button className="complete-day-button" onClick={onComplete} type="button">
        {isComplete ? 'Выполнено ✓' : 'Complete Day'}
      </button>
    </article>
  );
}
