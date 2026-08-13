export type BrainZone = 'pfc' | 'limbic' | 'hippocampus' | 'amygdala';

export type AppCategory = 'shortVideo' | 'messages' | 'search' | 'creative';

export type Symptom = 'fog' | 'forgetful' | 'anxiety' | 'noMotivation' | 'distracted';

export type BrainZoneState = {
  color: string;
  damage: number;
  label: string;
  status: string;
};

export type BrainState = {
  health: number;
  verdict: string;
  worstZone: BrainZone;
  zones: Record<BrainZone, BrainZoneState>;
};

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
  noMotivation: 'limbic',
  distracted: 'pfc',
};

export function calculateInitialBrainState(
  sleepHours: number,
  screenTime: number,
  selectedApps: AppCategory[],
  selectedSymptoms: Symptom[],
  primaryGoal = 'Фокус',
) {
  return calculateBrainHealth(sleepHours, screenTime, selectedApps, selectedSymptoms, primaryGoal);
}

export function calculateCheckInState(
  sleepHours: number,
  screenTime: number,
  selectedApps: AppCategory[],
  selectedSymptoms: Symptom[],
) {
  return calculateBrainHealth(sleepHours, screenTime, selectedApps, selectedSymptoms);
}

export function calculateBrainHealth(
  sleepHours: number,
  screenTime: number,
  appTypes: AppCategory[],
  symptoms: Symptom[],
  primaryGoal = 'Фокус',
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

  for (const symptom of symptoms) damage[symptomZone[symptom]] += 10;

  const clipped = mapDamage(damage);
  const worstZone = getWorstZone(clipped);
  const health = Math.max(0, 100 - Math.round(average(Object.values(clipped))));

  return {
    health,
    verdict: buildVerdict(sleepHours, appTypes, worstZone, primaryGoal),
    worstZone,
    zones: toZoneState(clipped),
  };
}

function mapDamage(damage: Record<BrainZone, number>) {
  return Object.fromEntries(
    Object.entries(damage).map(([zone, value]) => [zone, clamp(Math.round(value), 0, 100)]),
  ) as Record<BrainZone, number>;
}

function toZoneState(damage: Record<BrainZone, number>) {
  return Object.fromEntries(
    Object.entries(damage).map(([zone, value]) => [
      zone,
      { damage: value, color: zoneColor(value), label: labels[zone as BrainZone], status: zoneStatus(value) },
    ]),
  ) as Record<BrainZone, BrainZoneState>;
}

function getWorstZone(damage: Record<BrainZone, number>) {
  return Object.entries(damage).sort((a, b) => b[1] - a[1])[0][0] as BrainZone;
}

function buildVerdict(sleep: number, apps: AppCategory[], worst: BrainZone, goal: string) {
  const reasons = [];
  if (sleep < 6) reasons.push('критический дефицит сна');
  if (apps.includes('shortVideo')) reasons.push('перегруз от Reels');
  if (apps.includes('messages')) reasons.push('информационный стресс');
  if (apps.includes('search')) reasons.push('цифровая амнезия');
  const prefix = reasons.length ? reasons.join(' + ') : 'стартовый профиль стабилен';
  return `${capitalize(prefix)}: ${labels[worst]} требует внимания. Цель: ${goal}.`;
}

function zoneColor(damage: number) {
  if (damage >= 70) return '#f43f5e';
  if (damage >= 45) return '#f59e0b';
  if (damage >= 25) return '#6366f1';
  return '#38bdf8';
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
