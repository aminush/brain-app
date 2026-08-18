import { useState } from 'react';
import type { Language } from '../../lib/language';
import type { TrackerEntry } from '../../lib/tracker';
import {
  buildWeeklyReport,
  formatDay,
  formatHours,
  formatMinuteChange,
  formatPercentChange,
  padWeek,
} from '../../lib/trackerStats';
import { getTrackerCopy } from './trackerCopy';

type Props = {
  entries: TrackerEntry[];
  language: Language;
};

export function WeeklyTrackerPanel({ entries, language }: Props) {
  const visibleEntries = padWeek(entries);
  const realEntries = entries.slice(-7);
  const lastEntry = realEntries[realEntries.length - 1];
  const [selectedDate, setSelectedDate] = useState(lastEntry?.date ?? '');
  const selected = realEntries.find((entry) => entry.date === selectedDate) ?? lastEntry;
  const previous = selected ? realEntries[realEntries.indexOf(selected) - 1] : undefined;
  const report = buildWeeklyReport(realEntries);
  const copy = getTrackerCopy(language);

  return (
    <section className="weekly-tracker-panel">
      <p className="eyebrow">{copy.weeklyStats}</p>
      <div className="weekly-tracker-heading">
        <h2>{copy.week}</h2>
        {selected && <span>{formatDay(selected.date, 0)}</span>}
      </div>
      <div className="tracker-summary">
        <SummaryCard label={copy.screenTime} value={formatPercentChange(report.currentScreen, report.previousScreen, true)} />
        <SummaryCard label={copy.sleep} value={formatMinuteChange(report.currentSleep - report.previousSleep)} />
        <SummaryCard label={copy.steps} value={formatSteps(report.totalSteps)} />
      </div>
      {selected && (
        <article className="day-detail">
          <Metric label={copy.screenTime} value={formatHours(selected.screenTime)} change={previous ? formatPercentChange(selected.screenTime, previous.screenTime, true) : '0%'} />
          <Metric label={copy.sleep} value={`${selected.sleepHours.toFixed(1)}h`} change={previous ? formatMinuteChange(selected.sleepHours - previous.sleepHours) : '0 min'} />
          <Metric label={copy.steps} value={formatSteps(selected.steps)} change={previous ? formatSteps(selected.steps - previous.steps, true) : '0'} />
        </article>
      )}
      <div className="week-grid">
        {visibleEntries.map((entry, index) => (
          <button className={entry.date === selected?.date ? 'week-day active' : 'week-day'} disabled={entry.date.startsWith('empty')} key={`${entry.date}-${index}`} onClick={() => setSelectedDate(entry.date)} type="button">
            <span>{formatDay(entry.date, index)}</span>
            <Bar label={copy.screenShort} max={12} value={entry.screenTime} />
            <Bar label={copy.sleepShort} max={10} value={entry.sleepHours} />
            <Bar label={copy.stepsShort} max={10000} value={entry.steps} />
          </button>
        ))}
      </div>
    </section>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return <div><span>{label}</span><strong>{value}</strong></div>;
}

function Metric({ change, label, value }: { change: string; label: string; value: string }) {
  return <p><span>{label}</span><strong>{value}</strong><em>{change}</em></p>;
}

function Bar({ label, max, value }: { label: string; max: number; value: number }) {
  const width = Math.min(100, Math.round((value / max) * 100));
  return <div className="tracker-bar"><small>{label}</small><span><i style={{ width: `${width}%` }} /></span></div>;
}

function formatSteps(steps: number, withSign = false) {
  const sign = withSign && steps > 0 ? '+' : '';
  return `${sign}${Math.round(steps).toLocaleString('en-US')}`;
}
