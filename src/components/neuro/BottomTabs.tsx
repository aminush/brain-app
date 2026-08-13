import type { Tab } from './types';

const tabs: Array<{ id: Tab; label: string; icon: string }> = [
  { id: 'home', label: 'Мой Мозг', icon: '🧠' },
  { id: 'training', label: 'Тренировки', icon: '🎯' },
  { id: 'science', label: 'Наука', icon: '📚' },
];

type Props = {
  activeTab: Tab;
  onChange: (tab: Tab) => void;
};

export function BottomTabs({ activeTab, onChange }: Props) {
  return (
    <nav className="bottom-tabs" aria-label="Главная навигация">
      {tabs.map((tab) => (
        <button
          aria-current={activeTab === tab.id ? 'page' : undefined}
          className={activeTab === tab.id ? 'tab-button active' : 'tab-button'}
          key={tab.id}
          onClick={() => onChange(tab.id)}
          type="button"
        >
          <span>{tab.icon}</span>
          <span>{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
