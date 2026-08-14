import type { Tab } from './types';
import { text, type Language } from '../../lib/language';

const tabs: Array<{ id: Tab; labelKey: 'myBrain' | 'tracker' | 'training' | 'science'; icon: string }> = [
  { id: 'home', labelKey: 'myBrain', icon: '🧠' },
  { id: 'tracker', labelKey: 'tracker', icon: '📈' },
  { id: 'training', labelKey: 'training', icon: '🎯' },
  { id: 'science', labelKey: 'science', icon: '📚' },
];

type Props = {
  activeTab: Tab;
  language: Language;
  onChange: (tab: Tab) => void;
};

export function BottomTabs({ activeTab, language, onChange }: Props) {
  const t = text[language];

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
          <span>{t[tab.labelKey]}</span>
        </button>
      ))}
    </nav>
  );
}
