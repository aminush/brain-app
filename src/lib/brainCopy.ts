import type { BrainZone } from './brainTypes';
import type { Language } from './language';

const zoneNames = {
  eng: {
    amygdala: 'Amygdala',
    hippocampus: 'Hippocampus',
    limbic: 'Limbic system',
    pfc: 'Prefrontal cortex',
  },
  рус: {
    amygdala: 'Амигдала',
    hippocampus: 'Гиппокамп',
    limbic: 'Лимбическая система',
    pfc: 'Префронтальная кора',
  },
} satisfies Record<Language, Record<BrainZone, string>>;

const zoneStatus = {
  eng: {
    calm: 'calm',
    critical: 'critical overload',
    fog: 'light fog',
    stable: 'stable',
    tension: 'tension',
  },
  рус: {
    calm: 'спокойно',
    critical: 'критическая перегрузка',
    fog: 'лёгкий туман',
    stable: 'стабильно',
    tension: 'напряжение',
  },
} satisfies Record<Language, Record<string, string>>;

export function getZoneName(zone: BrainZone, language: Language) {
  return zoneNames[language][zone];
}

export function getZoneStatus(damage: number, isCalm: boolean, language: Language) {
  const copy = zoneStatus[language];
  if (isCalm) return copy.calm;
  if (damage >= 70) return copy.critical;
  if (damage >= 45) return copy.tension;
  if (damage >= 25) return copy.fog;
  return copy.stable;
}

export function getBrainVerdict(zone: BrainZone, language: Language) {
  if (language === 'eng') {
    return `${getZoneName(zone, language)} needs attention. Start with one small reset today.`;
  }

  return `${getZoneName(zone, language)} требует внимания. Начни с одной маленькой перезагрузки сегодня.`;
}
