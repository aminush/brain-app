import { useEffect, useRef, useState } from 'react';
import cupCollection from '../../assets/cup-collection.png';
import { useBrainState } from '../../context/BrainStateContext';
import { useNeuroXp } from '../../context/NeuroXpContext';
import { getCups, type CupConfig } from '../../lib/fillCupData';
import type { Language } from '../../lib/language';

type Props = {
  language: Language;
};

export function FillYourCupWidget({ language }: Props) {
  const { healWorstZone } = useBrainState();
  const { completeDailyCup, dailyPick, selectDailyCup, userXP } = useNeuroXp();
  const cups = getCups(language);
  const copy = cupCopy[language];
  const [shakingCup, setShakingCup] = useState<string | null>(null);
  const [lockMessage, setLockMessage] = useState<string | null>(null);
  const [xpBurst, setXpBurst] = useState<number | null>(null);
  const [unlockedCup, setUnlockedCup] = useState<string | null>(null);
  const previousXP = useRef(userXP);

  useEffect(() => {
    const unlocked = cups.find((cup) => previousXP.current < cup.unlockXP && userXP >= cup.unlockXP);
    previousXP.current = userXP;
    if (!unlocked) return;
    setUnlockedCup(unlocked.id);
    const timeout = window.setTimeout(() => setUnlockedCup(null), 1400);
    return () => window.clearTimeout(timeout);
  }, [cups, userXP]);

  function chooseCup(cup: CupConfig) {
    if (userXP < cup.unlockXP) {
      setShakingCup(cup.id);
      setLockMessage(copy.lock(cup.unlockXP - userXP));
      window.setTimeout(() => setShakingCup(null), 500);
      return;
    }
    if (dailyPick) return;
    setLockMessage(null);
    const quest = cup.quests[Math.floor(Math.random() * cup.quests.length)];
    selectDailyCup(cup.id, quest.id);
  }

  function completeCup(cup: CupConfig) {
    if (!completeDailyCup(cup.reward)) return;
    healWorstZone();
    navigator.vibrate?.([35, 45, 70]);
    setXpBurst(cup.reward);
    window.setTimeout(() => setXpBurst(null), 1200);
  }

  return (
    <section className="fill-cup-widget">
      <div className="cup-heading">
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2>{copy.title}</h2>
          <p>{copy.text}</p>
        </div>
        {xpBurst && <strong className="xp-burst">+{xpBurst} XP</strong>}
      </div>

      <div className="cup-grid">
        {cups.map((cup) => (
          <CupCard
            cup={cup}
            isDimmed={Boolean(dailyPick && dailyPick.cupId !== cup.id)}
            isFlipped={dailyPick?.cupId === cup.id}
            isCompleted={dailyPick?.cupId === cup.id && dailyPick.completed}
            isShaking={shakingCup === cup.id}
            isUnlockedNow={unlockedCup === cup.id}
            key={cup.id}
            questId={dailyPick?.cupId === cup.id ? dailyPick.questId : null}
            userXP={userXP}
            onChoose={() => chooseCup(cup)}
            onComplete={() => completeCup(cup)}
            copy={copy}
          />
        ))}
      </div>
      {lockMessage && <p className="cup-tooltip" role="status">{lockMessage}</p>}
      {dailyPick?.completed && <p className="cup-done-note">{copy.doneNote}</p>}
    </section>
  );
}

type CupCardProps = {
  cup: CupConfig;
  isDimmed: boolean;
  isFlipped: boolean;
  isCompleted: boolean;
  isShaking: boolean;
  isUnlockedNow: boolean;
  questId: string | null;
  userXP: number;
  onChoose: () => void;
  onComplete: () => void;
  copy: typeof cupCopy.eng;
};

function CupCard(props: CupCardProps) {
  const { copy, cup, isCompleted, isDimmed, isFlipped, isShaking, isUnlockedNow, questId, userXP, onChoose, onComplete } = props;
  const isLocked = userXP < cup.unlockXP;
  const quest = cup.quests.find((item) => item.id === questId);
  const progress = cup.unlockXP ? Math.min(100, (userXP / cup.unlockXP) * 100) : 100;
  const classes = ['cup-card', isFlipped ? 'flipped' : '', isDimmed ? 'dimmed' : '', isShaking ? 'shake' : '', isUnlockedNow ? 'unlocking' : ''].join(' ');

  return (
    <article className={classes}>
      <div className="cup-card-inner">
        <button className={`cup-card-face cup-front ${cup.id}`} disabled={isDimmed} onClick={onChoose} type="button">
          <span className={`cup-art sprite-${cup.sprite}`} style={{ backgroundImage: `url(${cupCollection})` }} />
          {isLocked && (
            <span className="cup-lock">
              <span>{copy.needXp(cup.unlockXP)}</span>
              <i><b style={{ width: `${progress}%` }} /></i>
            </span>
          )}
        </button>
        <div className="cup-card-face cup-back">
          <span>{quest?.zone}</span>
          <p>{quest?.text}</p>
          <button className="cup-complete" disabled={!quest || isCompleted} onClick={onComplete} type="button">
            {isCompleted ? copy.completed : copy.complete(cup.reward)}
          </button>
        </div>
      </div>
    </article>
  );
}

const cupCopy = {
  eng: {
    complete: (reward: number) => `Done! (+${reward} XP)`,
    completed: 'Counted',
    doneNote: "Today's Neuro quest is complete. A new cup opens tomorrow.",
    eyebrow: 'Daily neural reset',
    lock: (amount: number) => `Collect ${amount} more XP to unlock this cup!`,
    needXp: (amount: number) => `🔒 Need ${amount} XP`,
    text: 'Pick a cup to switch your brain away from social feeds.',
    title: 'Pick a way to fill your cup',
  },
  рус: {
    complete: (reward: number) => `Выполнено! (+${reward} XP)`,
    completed: 'Засчитано',
    doneNote: 'Сегодняшний Neuro-квест выполнен. Новая чашка откроется завтра.',
    eyebrow: 'Ежедневная нейро-перезагрузка',
    lock: (amount: number) => `Собери ещё ${amount} XP, чтобы открыть эту чашку!`,
    needXp: (amount: number) => `🔒 Нужно ${amount} XP`,
    text: 'Выбери чашку, чтобы переключить мозг с соцсетей.',
    title: 'Выбери способ наполнить чашку',
  },
} satisfies Record<Language, {
  complete: (reward: number) => string;
  completed: string;
  doneNote: string;
  eyebrow: string;
  lock: (amount: number) => string;
  needXp: (amount: number) => string;
  text: string;
  title: string;
}>;
