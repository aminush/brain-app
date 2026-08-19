import { useState } from 'react';
import type { HabitDay, HabitTrack } from '../../lib/habitTracks';
import type { Language } from '../../lib/language';

type Props = {
  day: HabitDay;
  isComplete: boolean;
  language: Language;
  track: HabitTrack;
  onComplete: () => void;
};

export function DailyActionCard({ day, isComplete, language, track, onComplete }: Props) {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const copy = language === 'eng' ? en : ru;

  return (
    <article className={isComplete ? 'daily-action-card complete' : 'daily-action-card'}>
      <div className="daily-card-top">
        <span style={{ background: track.color }}>{track.emoji}</span>
        <div>
          <p>{copy.day} {day.day}</p>
          <h3>{day.title}</h3>
        </div>
      </div>
      <div className="daily-task">
        <span>{copy.task}</span>
        <p>{day.task}</p>
      </div>
      <button className="detail-toggle" onClick={() => setIsDetailOpen(!isDetailOpen)} type="button">
        <span>{copy.why}</span>
        <b>{isDetailOpen ? '−' : '+'}</b>
      </button>
      {isDetailOpen && <p className="habit-detail-text">{day.detail}</p>}
      <button className="complete-day-button" onClick={onComplete} type="button">
        {isComplete ? copy.complete : copy.completeDay}
      </button>
    </article>
  );
}

const en = {
  complete: 'Completed ✓',
  completeDay: 'Complete day',
  day: 'Day',
  task: 'Task',
  why: 'Why does this work?',
};

const ru = {
  complete: 'Выполнено ✓',
  completeDay: 'Завершить день',
  day: 'День',
  task: 'Задача',
  why: 'Зачем это нужно?',
};
