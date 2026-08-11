type Props = {
  focusMinutes: number;
  health: number;
};

export function BrainCard({ focusMinutes, health }: Props) {
  return (
    <section className="brain-card">
      <div className="brain-orbit" aria-hidden="true">
        <span>🧠</span>
      </div>
      <div className="brain-copy">
        <p className="eyebrow">Состояние мозга</p>
        <h2>Префронтальная кора (ПФК)</h2>
      </div>
      <div className="metric-line">
        <span>Здоровье ПФК</span>
        <strong>{health}%</strong>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${health}%` }} />
      </div>
      <div className="stats-row">
        <div>
          <span>Фокус</span>
          <strong>{focusMinutes} мин</strong>
        </div>
        <div>
          <span>Режим</span>
          <strong>Reboot</strong>
        </div>
      </div>
    </section>
  );
}
