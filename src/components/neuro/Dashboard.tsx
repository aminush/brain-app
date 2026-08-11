import { BrainCard } from './BrainCard';
import type { Tab } from './types';

type Props = {
  activeTab: Tab;
  focusMinutes: number;
  health: number;
  onOpenJournal: () => void;
  onOpenRescue: () => void;
  onPickScreenshot: (file: File) => void;
};

export function Dashboard({
  activeTab,
  focusMinutes,
  health,
  onOpenJournal,
  onOpenRescue,
  onPickScreenshot,
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
          <BrainCard focusMinutes={focusMinutes} health={health} />
          <button className="rescue-button" onClick={onOpenRescue} type="button">
            🔥 ЭКСТРЕННАЯ НЕЙРО-РЕАНИМАЦИЯ (3 мин)
          </button>
          <div className="secondary-actions">
            <label className="secondary-button">
              📸 Загрузить скриншот экранного времени
              <input
                accept="image/*"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (file) onPickScreenshot(file);
                  event.target.value = '';
                }}
                type="file"
              />
            </label>
            <button className="secondary-button" onClick={onOpenJournal} type="button">
              🧪 Дневник состояний & Заземление
            </button>
          </div>
        </>
      ) : (
        <section className="placeholder-panel">
          <h2>{tabTitle(activeTab)}</h2>
          <p>Раздел готов к наполнению заданиями, графиками и социальными ритуалами.</p>
        </section>
      )}
    </main>
  );
}

function tabTitle(tab: Tab) {
  const titles: Record<Tab, string> = {
    home: 'Главная',
    quests: 'Квесты',
    science: 'Наука',
    network: 'Сеть',
  };
  return titles[tab];
}
