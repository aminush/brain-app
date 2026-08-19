import type { AppCategory } from './brainTypes';
import type { Language } from './language';
import { isSupabaseConfigured, supabase } from './supabase';

type ScreenTimeResult = {
  appSummary: string;
  appTypes: AppCategory[];
  biggestTrigger: string;
  changeFromYesterday: number;
  experiment: string;
  gamesTime: number;
  messagingTime: number;
  otherTime: number;
  pattern: string;
  screenTime: number;
  socialTime: number;
  videoTime: number;
};

export async function analyzeScreenTimeImage(file: File, language: Language): Promise<ScreenTimeResult> {
  if (!isSupabaseConfigured) return fallbackResult(file.name, language);

  const imageBase64 = await fileToBase64(file);
  const responseLanguage = language === 'eng' ? 'English' : 'Russian';
  const { data, error } = await supabase.functions.invoke('ai', {
    body: {
      imageBase64,
      imageMime: file.type || 'image/png',
      prompt:
        `Read the screen-time screenshot. Extract total screen time, social media, video, messaging, games, other apps, change from yesterday, biggest trigger, and usage pattern. Write biggestTrigger, pattern, and summary in ${responseLanguage}.`,
      system:
        'Return only JSON: {"screenTimeHours": number, "socialHours": number, "videoHours": number, "messagingHours": number, "gameHours": number, "otherHours": number, "changeFromYesterdayHours": number, "biggestTrigger": string, "pattern": string, "summary": string}.',
    },
  });

  if (error) return fallbackResult(file.name, language);
  const text = typeof data?.text === 'string' ? data.text : '';
  return parseAiText(text, language) ?? fallbackResult(file.name, language);
}

function parseAiText(text: string, language: Language): ScreenTimeResult | null {
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) return null;

  try {
    const parsed = JSON.parse(jsonMatch[0]) as Record<string, unknown>;
    const screenTime = toNumber(parsed.screenTimeHours, -1);
    if (screenTime < 0) return null;
    const fallback = fallbackText[language];

    return buildResult({
      biggestTrigger: toText(parsed.biggestTrigger, 'TikTok - 1h 43m'),
      changeFromYesterday: toNumber(parsed.changeFromYesterdayHours, -0.8),
      gamesTime: toNumber(parsed.gameHours, 0),
      messagingTime: toNumber(parsed.messagingHours, 0),
      otherTime: toNumber(parsed.otherHours, 0),
      language,
      pattern: toText(parsed.pattern, fallback.pattern),
      screenTime,
      socialTime: toNumber(parsed.socialHours, 0),
      summary: toText(parsed.summary, fallback.aiSummary),
      videoTime: toNumber(parsed.videoHours, 0),
    });
  } catch {
    return null;
  }
}

function fallbackResult(fileName: string, language: Language): ScreenTimeResult {
  const fallback = fallbackText[language];
  return buildResult({
    biggestTrigger: 'TikTok - 1h 43m',
    changeFromYesterday: -0.8,
    gamesTime: 0.3,
    messagingTime: 0.7,
    otherTime: 0.9,
    language,
    pattern: fallback.pattern,
    screenTime: 5.2,
    socialTime: 1.9,
    summary: fallback.uploaded(fileName),
    videoTime: 1.7,
  });
}

function buildResult(input: ScreenInsightInput): ScreenTimeResult {
  const experiment = input.language === 'eng'
    ? 'Try keeping short-form video out of your last hour before sleep.'
    : 'Попробуй убрать короткие видео из последнего часа перед сном.';

  return {
    appSummary: input.summary,
    appTypes: detectAppTypes(input),
    biggestTrigger: input.biggestTrigger,
    changeFromYesterday: input.changeFromYesterday,
    experiment,
    gamesTime: clamp(input.gamesTime, 0, 15),
    messagingTime: clamp(input.messagingTime, 0, 15),
    otherTime: clamp(input.otherTime, 0, 15),
    pattern: input.pattern,
    screenTime: clamp(input.screenTime, 0, 15),
    socialTime: clamp(input.socialTime, 0, 15),
    videoTime: clamp(input.videoTime, 0, 15),
  };
}

function detectAppTypes(input: ScreenInsightInput) {
  const appTypes: AppCategory[] = [];
  if (input.videoTime > 0.3) appTypes.push('shortVideo');
  if (input.messagingTime > 0.3 || input.socialTime > 0.3) appTypes.push('messages');
  if (input.gamesTime > 0.3) appTypes.push('gaming');
  if (input.otherTime > 0.3) appTypes.push('other');
  return appTypes;
}

function toNumber(value: unknown, fallback: number) {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
}

function toText(value: unknown, fallback: string) {
  return typeof value === 'string' && value.trim() ? value : fallback;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result);
      resolve(result.includes(',') ? result.split(',')[1] : result);
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

type ScreenInsightInput = Omit<ScreenTimeResult, 'appSummary' | 'appTypes' | 'experiment'> & {
  language: Language;
  summary: string;
};

const fallbackText = {
  eng: {
    aiSummary: 'AI recognized your screen-time pattern.',
    pattern: 'Most scrolling happens between 21:00-23:00.',
    uploaded: (fileName: string) => `Screenshot "${fileName}" uploaded. Showing a sample insight until AI is configured.`,
  },
  рус: {
    aiSummary: 'ИИ распознал твой паттерн экранного времени.',
    pattern: 'Больше всего скроллинга происходит примерно между 21:00 и 23:00.',
    uploaded: (fileName: string) => `Скриншот "${fileName}" загружен. Пока AI не настроен, показан пример анализа.`,
  },
} satisfies Record<Language, {
  aiSummary: string;
  pattern: string;
  uploaded: (fileName: string) => string;
}>;

export type { ScreenTimeResult };
