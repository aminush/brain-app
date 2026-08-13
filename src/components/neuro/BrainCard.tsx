import { calculateCheckInState, type BrainState } from '../../lib/brainLogic';
import { BrainMap } from './BrainMap';

type Props = {
  focusMinutes: number;
  health: number;
  state?: BrainState;
};

export function BrainCard({ focusMinutes, health, state }: Props) {
  const brainState = state ?? calculateCheckInState(7, 5, [], []);

  return (
    <section className="brain-card">
      <BrainMap state={brainState} />
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
        <div>
          <span>Уязвимая зона</span>
          <strong>{brainState.zones[brainState.worstZone].label}</strong>
        </div>
      </div>
      <p className="brain-verdict">{brainState.verdict}</p>
    </section>
  );
}
