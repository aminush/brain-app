import { BrainCard } from './BrainCard';
import { LanguageSwitch } from './LanguageSwitch';
import { SciencePanel } from './SciencePanel';
import { StepsWidget } from './StepsWidget';
import { TrainingPanel } from './TrainingPanel';
import { TrackerPanel } from './TrackerPanel';
import type { BrainState } from '../../lib/brainLogic';
import { text, type Language } from '../../lib/language';
import type { TrackerEntry } from '../../lib/tracker';
import type { Tab } from './types';

type Props = {
  activeTab: Tab;
  brainState?: BrainState;
  focusMinutes: number;
  health: number;
  isAnalyzingScreenshot: boolean;
  language: Language;
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

  return (
    <main className="neuro-shell dashboard">
      <header className="top-bar">
        <div>
          <p>Амина</p>
          <h1>{activeTab === 'home' ? t.homeTitle : tabTitle(activeTab, language)}</h1>
        </div>
        <div className="top-actions">
          <LanguageSwitch language={language} onChangeLanguage={onChangeLanguage} />
          <button className="logout-button" onClick={onLogOut} type="button">
            {t.logout}
          </button>
        </div>
      </header>

      {activeTab === 'home' ? (
        <>
          <BrainCard focusMinutes={focusMinutes} health={health} language={language} state={brainState} />
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
        <TrackerPanel entries={trackerEntries} />
      ) : activeTab === 'training' ? (
        <TrainingPanel language={language} zone={brainState?.worstZone ?? 'pfc'} />
      ) : activeTab === 'science' ? (
        <SciencePanel />
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
