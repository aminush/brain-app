import type { Language } from './language';

export function getBrainStateTitle(health: number, language: Language) {
  if (language === 'рус') {
    if (health >= 75) return 'Ясный ум';
    if (health >= 55) return 'Разогрев';
    if (health >= 35) return 'В тумане';
    return 'Перегруз';
  }

  if (health >= 75) return 'Clear Mind';
  if (health >= 55) return 'Warming Up';
  if (health >= 35) return 'In a Fog';
  return 'Overloaded';
}
