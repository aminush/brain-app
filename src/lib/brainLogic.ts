import type { AppCategory, BrainState, BrainZone, BrainZoneState, Symptom } from './brainTypes';

export type { AppCategory, BrainState, BrainZone, BrainZoneState, Symptom };

const labels: Record<BrainZone, string> = {
  pfc: 'ПФК',
  limbic: 'Лимбическая система',
  hippocampus: 'Гиппокамп',
  amygdala: 'Амигдала',
};

const symptomZone: Record<Symptom, BrainZone> = {
  fog: 'pfc',
  forgetful: 'hippocampus',
  anxiety: 'amygdala',
  irritation: 'amygdala',
  gadgetFatigue: 'pfc',
  stuckPhone: 'limbic',
  noMotivation: 'limbic',
  distracted: 'pfc',
};

export function calculateInitialBrainState(
  sleepHours: number, screenTime: number, selectedApps: AppCategory[],
  selectedSymptoms: Symptom[], primaryGoal = 'Фокус', steps = 0,
) {
  return calculateBrainHealth(sleepHours, screenTime, selectedApps, selectedSymptoms, primaryGoal, steps);
}

export function calculateCheckInState(
  sleepHours: number, screenTime: number, selectedApps: AppCategory[],
  selectedSymptoms: Symptom[], steps = 0,
) {
  return calculateBrainHealth(sleepHours, screenTime, selectedApps, selectedSymptoms, 'Фокус', steps);
}

export function calculateBrainHealth(
  sleepHours: number, screenTime: number, appTypes: AppCategory[],
  symptoms: Symptom[], primaryGoal = 'Фокус', steps = 0,
): BrainState {
  const damage: Record<BrainZone, number> = {
    pfc: Math.max(0, screenTime - 7) * 3,
    limbic: Math.max(0, screenTime - 8) * 2,
    hippocampus: 0,
    amygdala: 0,
  };

  if (sleepHours < 6) {
    damage.hippocampus += 30;
    damage.pfc += 20;
    damage.amygdala += 35;
  }

  if (appTypes.includes('shortVideo')) {
    damage.limbic += 40;
    damage.pfc += 25;
  }
  if (appTypes.includes('messages')) damage.amygdala += 30;
  if (appTypes.includes('search')) damage.hippocampus += 20;
  if (appTypes.includes('creative')) damage.pfc -= 15;
  if (appTypes.includes('gaming')) {
    damage.limbic += 24;
    damage.pfc += 12;
  }
  if (appTypes.includes('other')) damage.pfc += 6;

  for (const symptom of symptoms) damage[symptomZone[symptom]] += 10;

  const calmZones = new Set<BrainZone>();
  if (steps > 0 && steps < 3000) {
    damage.pfc += 10;
    damage.amygdala += 10;
  }

  if (steps >= 6000) {
    damage.hippocampus -= Math.min(20, damage.hippocampus);
    calmZones.add('amygdala');
  }

  const clipped = mapDamage(damage);
  const worstZone = getWorstZone(clipped);
  const health = Math.max(0, 100 - Math.round(average(Object.values(clipped))));

  return {
    health,
    verdict: buildVerdict(sleepHours, appTypes, worstZone, primaryGoal, steps),
    worstZone,
    zones: toZoneState(clipped, calmZones),
  };
}

export function healBrainZone(state: BrainState, amount = 15): BrainState {
  const healedZone = state.worstZone;
  const damage = Object.fromEntries(
    Object.entries(state.zones).map(([zone, value]) => [
      zone,
      zone === healedZone ? Math.max(0, value.damage - amount) : value.damage,
    ]),
  ) as Record<BrainZone, number>;
  const worstZone = getWorstZone(damage);

  return {
    ...state,
    health: Math.max(0, 100 - Math.round(average(Object.values(damage)))),
    worstZone,
    zones: toZoneState(damage, new Set([healedZone])),
  };
}

function mapDamage(damage: Record<BrainZone, number>) {
  return Object.fromEntries(
    Object.entries(damage).map(([zone, value]) => [zone, clamp(Math.round(value), 0, 100)]),
  ) as Record<BrainZone, number>;
}

function toZoneState(damage: Record<BrainZone, number>, calmZones: Set<BrainZone>) {
  return Object.fromEntries(
    Object.entries(damage).map(([zone, value]) => [
      zone,
      {
        color: calmZones.has(zone as BrainZone) ? '#00f0ff' : zoneColor(value),
        damage: value,
        label: labels[zone as BrainZone],
        status: calmZones.has(zone as BrainZone) ? 'спокойно' : zoneStatus(value),
      },
    ]),
  ) as Record<BrainZone, BrainZoneState>;
}

function getWorstZone(damage: Record<BrainZone, number>) {
  return Object.entries(damage).sort((a, b) => b[1] - a[1])[0][0] as BrainZone;
}

function buildVerdict(sleep: number, apps: AppCategory[], worst: BrainZone, goal: string, steps: number) {
  const reasons = [];
  if (sleep < 6) reasons.push('критический дефицит сна');
  if (steps > 0 && steps < 3000) reasons.push('мало движения');
  if (steps >= 6000) reasons.push('ходьба поддержала гиппокамп');
  if (apps.includes('shortVideo')) reasons.push('перегруз от Reels');
  if (apps.includes('messages')) reasons.push('информационный стресс');
  if (apps.includes('search')) reasons.push('цифровая амнезия');
  if (apps.includes('gaming')) reasons.push('долгие игровые сессии');
  const prefix = reasons.length ? reasons.join(' + ') : 'стартовый профиль стабилен';
  return `${capitalize(prefix)}: ${labels[worst]} требует внимания. Цель: ${goal}.`;
}

function zoneColor(damage: number) {
  if (damage > 60) return '#ff0055';
  if (damage > 30) return '#ffd700';
  return '#00f0ff';
}

function zoneStatus(damage: number) {
  if (damage >= 70) return 'критическая перегрузка';
  if (damage >= 45) return 'напряжение';
  if (damage >= 25) return 'лёгкий туман';
  return 'стабильно';
}

function average(values: number[]) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
