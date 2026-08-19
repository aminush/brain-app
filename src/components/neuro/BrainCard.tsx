import { calculateCheckInState, type BrainState } from '../../lib/brainLogic';
import { getBrainVerdict, getZoneName } from '../../lib/brainCopy';
import { getBrainStateTitle } from '../../lib/brainStateTitle';
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
      <BrainMap language={language} state={brainState} />
      <div className="brain-details">
        <div className="brain-copy">
          <p className="eyebrow">{t.brainCondition}</p>
          <h2>{getBrainStateTitle(brainState.health, language)}</h2>
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
            <strong>{t.modeReboot}</strong>
          </div>
          <div>
            <span>{t.weakZone}</span>
            <strong>{getZoneName(brainState.worstZone, language)}</strong>
          </div>
        </div>
        <p className="brain-verdict">{getBrainVerdict(brainState.worstZone, language)}</p>
        <p className="synap-note">
          {language === 'eng'
            ? 'Synap Index is an app-generated score based on your tracked habits. Not a medical measurement.'
            : 'Synap Index — оценка приложения на основе твоих привычек. Это не медицинский показатель.'}
        </p>
      </div>
    </section>
  );
}
