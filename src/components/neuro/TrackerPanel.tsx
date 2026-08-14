import type { TrackerEntry } from '../../lib/tracker';

const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

type Props = {
  entries: TrackerEntry[];
};

export function TrackerPanel({ entries }: Props) {
  const visibleEntries = padWeek(entries);

  return (
    <section className="tracker-panel">
      <p className="eyebrow">Трекер</p>
      <h2>Прогресс за неделю</h2>
      <div className="tracker-summary">
        <SummaryCard label="Шаги" value={`${average(entries.map((item) => item.steps)).toLocaleString('ru-RU')} ср.`} />
        <SummaryCard label="Экран" value={`${average(entries.map((item) => item.screenTime)).toFixed(1)} ч`} />
        <SummaryCard label="Состояние" value={`${Math.round(average(entries.map((item) => item.health)))}%`} />
      </div>
      <div className="week-grid">
        {visibleEntries.map((entry, index) => (
          <article className="week-day" key={`${entry.date}-${index}`}>
            <span>{formatDay(entry.date, index)}</span>
            <Bar label="Шаги" max={6000} value={entry.steps} />
            <Bar label="Экран" max={12} value={entry.screenTime} />
            <Bar label="Мозг" max={100} value={entry.health} />
          </article>
        ))}
      </div>
    </section>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Bar({ label, max, value }: { label: string; max: number; value: number }) {
  const width = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className="tracker-bar">
      <small>{label}</small>
      <span>
        <i style={{ width: `${width}%` }} />
      </span>
    </div>
  );
}

function padWeek(entries: TrackerEntry[]) {
  const sorted = entries.slice(-7);
  const empty = Array.from({ length: Math.max(0, 7 - sorted.length) }, (_, index) => ({
    date: `empty-${index}`,
    health: 0,
    screenTime: 0,
    steps: 0,
  }));
  return [...empty, ...sorted];
}

function formatDay(date: string, index: number) {
  if (date.startsWith('empty')) return weekDays[index] ?? '';
  return new Intl.DateTimeFormat('ru-RU', { weekday: 'short' }).format(new Date(date));
}

function average(values: number[]) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}
