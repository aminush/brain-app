import type { AppCategory, Symptom } from '../../lib/brainLogic';

export const appOptions: Array<{ id: AppCategory; label: string }> = [
  { id: 'shortVideo', label: 'Короткие видео (TikTok / Reels / Shorts)' },
  { id: 'messages', label: 'Мессенджеры и Новости (Telegram / WhatsApp)' },
  { id: 'search', label: 'Поисковики и Навигация (Google / Карты)' },
  { id: 'creative', label: 'Обучение / Творчество / Игры' },
];

export const symptomOptions: Array<{ id: Symptom; label: string }> = [
  { id: 'fog', label: 'Тяжесть и туман в голове' },
  { id: 'forgetful', label: 'Забываю детали и факты' },
  { id: 'anxiety', label: 'Раздражительность и тревога' },
  { id: 'noMotivation', label: 'Нет сил и мотивации на сложные задачи' },
  { id: 'distracted', label: 'Легкая расфокусировка' },
];

export const quickQuestions: Array<{ id: Symptom; label: string }> = [
  { id: 'anxiety', label: 'Чувствуешь ли раздражительность или тревогу?' },
  { id: 'forgetful', label: 'Трудно ли сегодня удерживать факты в голове?' },
  { id: 'noMotivation', label: 'Есть ли мотивация делать рутинную работу?' },
];
