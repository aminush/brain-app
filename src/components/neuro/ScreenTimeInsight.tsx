import type { Language } from '../../lib/language';
import type { ScreenTimeResult } from '../../lib/screenTimeAi';

type Props = {
  insight: ScreenTimeResult;
  language: Language;
};

export function ScreenTimeInsight({ insight, language }: Props) {
  const copy = language === 'eng' ? en : ru;

  return (
    <article className="screen-insight">
      <p className="eyebrow">{copy.title}</p>
      <div className="insight-hero">
        <strong>{formatHours(insight.screenTime)}</strong>
        <span>{formatChange(insight.changeFromYesterday)} {copy.fromYesterday}</span>
      </div>
      <div className="insight-grid">
        <Metric label={copy.biggestTrigger} value={insight.biggestTrigger} />
        <Metric label={copy.social} value={formatHours(insight.socialTime)} />
        <Metric label={copy.video} value={formatHours(insight.videoTime)} />
        <Metric label={copy.messaging} value={formatHours(insight.messagingTime)} />
        <Metric label={copy.games} value={formatHours(insight.gamesTime)} />
        <Metric label={copy.other} value={formatHours(insight.otherTime)} />
      </div>
      <p className="hint"><strong>{copy.pattern}</strong><br />{insight.pattern}</p>
      <p className="experiment-line"><strong>{copy.experiment}</strong><br />{insight.experiment}</p>
    </article>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function formatHours(hours: number) {
  const minutes = Math.round(hours * 60);
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}

function formatChange(hours: number) {
  const minutes = Math.abs(Math.round(hours * 60));
  return `${hours <= 0 ? '↓' : '↑'} ${minutes}m`;
}

const en = {
  biggestTrigger: 'Biggest trigger',
  experiment: "Today's experiment",
  fromYesterday: 'from yesterday',
  games: 'Games',
  messaging: 'Messaging',
  other: 'Other apps',
  pattern: 'Your pattern',
  social: 'Social media',
  title: 'Your screen time',
  video: 'Video',
};

const ru = {
  biggestTrigger: 'Главный триггер',
  experiment: 'Эксперимент на сегодня',
  fromYesterday: 'со вчерашнего дня',
  games: 'Игры',
  messaging: 'Сообщения',
  other: 'Другие приложения',
  pattern: 'Твой паттерн',
  social: 'Соцсети',
  title: 'Твоё экранное время',
  video: 'Видео',
};
