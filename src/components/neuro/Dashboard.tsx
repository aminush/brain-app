import { BrainCard } from './BrainCard';
import { SciencePanel } from './SciencePanel';
import { TrainingPanel } from './TrainingPanel';
import type { BrainState } from '../../lib/brainLogic';
import type { Tab } from './types';

type Props = {
  activeTab: Tab;
  brainState?: BrainState;
  focusMinutes: number;
  health: number;
  onOpenCheckIn: () => void;
  onOpenJournal: () => void;
};

export function Dashboard({
  activeTab,
  brainState,
  focusMinutes,
  health,
  onOpenCheckIn,
  onOpenJournal,
}: Props) {
  return (
    <main className="neuro-shell dashboard">
      <header className="top-bar">
        <div>
          <p>Амина</p>
          <h1>{activeTab === 'home' ? 'В дофаминовом тумане' : tabTitle(activeTab)}</h1>
        </div>
        <span className="status-dot" />
      </header>

      {activeTab === 'home' ? (
        <>
          <BrainCard focusMinutes={focusMinutes} health={health} state={brainState} />
          <div className="secondary-actions">
            <button className="secondary-button" onClick={onOpenCheckIn} type="button">
              📸 Daily Check-in и скриншот экранного времени
            </button>
            <button className="secondary-button" onClick={onOpenJournal} type="button">
              🧪 Дневник состояний & Заземление
            </button>
          </div>
        </>
      ) : activeTab === 'training' ? (
        <TrainingPanel zone={brainState?.worstZone ?? 'pfc'} />
      ) : activeTab === 'science' ? (
        <SciencePanel />
      ) : (
        null
      )}
    </main>
  );
}

function tabTitle(tab: Tab) {
  const titles: Record<Tab, string> = {
    home: 'Мой Мозг',
    training: 'Тренировки',
    science: 'Наука',
  };
  return titles[tab];
}
