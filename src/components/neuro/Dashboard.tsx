import { BrainCard } from './BrainCard';
import { FillYourCupWidget } from './FillYourCupWidget';
import { LanguageSwitch } from './LanguageSwitch';
import { SciencePanel } from './SciencePanel';
import { ScreenTimeInsight } from './ScreenTimeInsight';
import { StepsWidget } from './StepsWidget';
import { TrainingPanel } from './TrainingPanel';
import { TrackerPanel } from './TrackerPanel';
import type { BrainState } from '../../lib/brainLogic';
import type { HabitTrackId } from '../../lib/habitTracks';
import { text, type Language } from '../../lib/language';
import type { ScreenTimeResult } from '../../lib/screenTimeAi';
import type { TrackerEntry } from '../../lib/tracker';
import type { Tab } from './types';
import { useNeuroXp } from '../../context/NeuroXpContext';

type Props = {
  activeTab: Tab;
  brainState?: BrainState;
  focusMinutes: number;
  health: number;
  isAnalyzingScreenshot: boolean;
  language: Language;
  selectedHabitTrackId?: HabitTrackId;
  screenInsight?: ScreenTimeResult;
  steps: number;
  trackerEntries: TrackerEntry[];
  onAnalyzeScreenshot: (file: File) => void;
  onChangeLanguage: (language: Language) => void;
  onChangeSteps: (steps: number) => void;
  onLogOut: () => void;
  onOpenCheckIn: () => void;
  onOpenJournal: () => void;
};

export function Dashboard({
  activeTab,
  brainState,
  focusMinutes,
  health,
  isAnalyzingScreenshot,
  language,
  selectedHabitTrackId,
  screenInsight,
  steps,
  trackerEntries,
  onAnalyzeScreenshot,
  onChangeLanguage,
  onChangeSteps,
  onLogOut,
  onOpenCheckIn,
  onOpenJournal,
}: Props) {
  const t = text[language];
  const { userLevel, userXP } = useNeuroXp();

  return (
    <main className="neuro-shell dashboard">
      <header className="top-bar">
        <div>
          <p>Амина</p>
          <h1>{activeTab === 'home' ? t.homeTitle : tabTitle(activeTab, language)}</h1>
        </div>
        <div className="top-actions">
          <div className="xp-badge" title="Neuro-XP">
            <strong>LVL {userLevel}</strong>
            <span>{userXP} XP</span>
          </div>
          <LanguageSwitch language={language} onChangeLanguage={onChangeLanguage} />
          <button className="logout-button" onClick={onLogOut} type="button">
            {t.logout}
          </button>
        </div>
      </header>

      {activeTab === 'home' ? (
        <>
          <BrainCard focusMinutes={focusMinutes} health={health} language={language} state={brainState} />
          <FillYourCupWidget />
          {screenInsight && <ScreenTimeInsight insight={screenInsight} language={language} />}
          <div className="secondary-actions">
            <label className="secondary-button">
              {isAnalyzingScreenshot ? t.analyze : t.screenshot}
              <input
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) onAnalyzeScreenshot(file);
                  event.target.value = '';
                }}
                type="file"
              />
            </label>
            <button className="secondary-button" onClick={onOpenCheckIn} type="button">
              {t.checkIn}
            </button>
            <button className="secondary-button" onClick={onOpenJournal} type="button">
              {t.journal}
            </button>
          </div>
          <StepsWidget steps={steps} onChangeSteps={onChangeSteps} />
        </>
      ) : activeTab === 'tracker' ? (
        <TrackerPanel entries={trackerEntries} initialTrackId={selectedHabitTrackId} language={language} />
      ) : activeTab === 'training' ? (
        <TrainingPanel language={language} zone={brainState?.worstZone ?? 'pfc'} />
      ) : activeTab === 'science' ? (
        <SciencePanel language={language} />
      ) : (
        null
      )}
    </main>
  );
}

function tabTitle(tab: Tab, language: Language) {
  const t = text[language];
  const titles: Record<Tab, string> = {
    home: t.myBrain,
    tracker: t.tracker,
    training: t.training,
    science: t.science,
  };
  return titles[tab];
}
