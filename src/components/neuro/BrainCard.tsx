import { calculateCheckInState, type BrainState } from '../../lib/brainLogic';
import { text, type Language } from '../../lib/language';
import { BrainMap } from './BrainMap';

type Props = {
  focusMinutes: number;
  health: number;
  language: Language;
  state?: BrainState;
};

export function BrainCard({ focusMinutes, health, language, state }: Props) {
  const brainState = state ?? calculateCheckInState(7, 5, [], []);
  const t = text[language];

  return (
    <section className="brain-card">
      <BrainMap state={brainState} />
      <div className="brain-copy">
        <p className="eyebrow">{t.brainCondition}</p>
        <h2>{t.pfc}</h2>
      </div>
      <div className="metric-line">
        <span>{t.health}</span>
        <strong>{health}%</strong>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${health}%` }} />
      </div>
      <div className="stats-row">
        <div>
          <span>{t.focus}</span>
          <strong>{focusMinutes} min</strong>
        </div>
        <div>
          <span>{t.mode}</span>
          <strong>Reboot</strong>
        </div>
        <div>
          <span>{t.weakZone}</span>
          <strong>{brainState.zones[brainState.worstZone].label}</strong>
        </div>
      </div>
      <p className="brain-verdict">{brainState.verdict}</p>
    </section>
  );
}
