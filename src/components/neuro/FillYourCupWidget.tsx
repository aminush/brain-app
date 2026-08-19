import { useEffect, useRef, useState } from 'react';
import cupCollection from '../../assets/cup-collection.png';
import { useBrainState } from '../../context/BrainStateContext';
import { useNeuroXp } from '../../context/NeuroXpContext';
import { CUPS, type CupConfig } from '../../lib/fillCupData';

export function FillYourCupWidget() {
  const { healWorstZone } = useBrainState();
  const { completeDailyCup, dailyPick, selectDailyCup, userXP } = useNeuroXp();
  const [shakingCup, setShakingCup] = useState<string | null>(null);
  const [lockMessage, setLockMessage] = useState<string | null>(null);
  const [xpBurst, setXpBurst] = useState<number | null>(null);
  const [unlockedCup, setUnlockedCup] = useState<string | null>(null);
  const previousXP = useRef(userXP);

  useEffect(() => {
    const unlocked = CUPS.find((cup) => previousXP.current < cup.unlockXP && userXP >= cup.unlockXP);
    previousXP.current = userXP;
    if (!unlocked) return;
    setUnlockedCup(unlocked.id);
    const timeout = window.setTimeout(() => setUnlockedCup(null), 1400);
    return () => window.clearTimeout(timeout);
  }, [userXP]);

  function chooseCup(cup: CupConfig) {
    if (userXP < cup.unlockXP) {
      setShakingCup(cup.id);
      setLockMessage(`Собери ещё ${cup.unlockXP - userXP} XP, чтобы открыть эту чашку!`);
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
          <p className="eyebrow">Daily neural reset</p>
          <h2>Pick a way to fill your cup</h2>
          <p>Выбери чашку, чтобы переключить мозг с соцсетей</p>
        </div>
        {xpBurst && <strong className="xp-burst">+{xpBurst} XP</strong>}
      </div>

      <div className="cup-grid">
        {CUPS.map((cup) => (
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
          />
        ))}
      </div>
      {lockMessage && <p className="cup-tooltip" role="status">{lockMessage}</p>}
      {dailyPick?.completed && <p className="cup-done-note">Сегодняшний Neuro‑квест выполнен. Новая чашка откроется завтра.</p>}
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
};

function CupCard(props: CupCardProps) {
  const { cup, isCompleted, isDimmed, isFlipped, isShaking, isUnlockedNow, questId, userXP, onChoose, onComplete } = props;
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
              <span>🔒 Нужно {cup.unlockXP} XP</span>
              <i><b style={{ width: `${progress}%` }} /></i>
            </span>
          )}
        </button>
        <div className="cup-card-face cup-back">
          <span>{quest?.zone}</span>
          <p>{quest?.text}</p>
          <button className="cup-complete" disabled={!quest || isCompleted} onClick={onComplete} type="button">
            {isCompleted ? 'Засчитано' : `Выполнено! (+${cup.reward} XP)`}
          </button>
        </div>
      </div>
    </article>
  );
}
