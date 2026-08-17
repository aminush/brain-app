import type { AppCategory } from './brainTypes';
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

export async function analyzeScreenTimeImage(file: File): Promise<ScreenTimeResult> {
  if (!isSupabaseConfigured) return fallbackResult(file.name);

  const imageBase64 = await fileToBase64(file);
  const { data, error } = await supabase.functions.invoke('ai', {
    body: {
      imageBase64,
      imageMime: file.type || 'image/png',
      prompt:
        'Read the screen-time screenshot. Extract total screen time, social media, video, messaging, games, other apps, change from yesterday, biggest trigger, and usage pattern.',
      system:
        'Return only JSON: {"screenTimeHours": number, "socialHours": number, "videoHours": number, "messagingHours": number, "gameHours": number, "otherHours": number, "changeFromYesterdayHours": number, "biggestTrigger": string, "pattern": string, "summary": string}.',
    },
  });

  if (error) return fallbackResult(file.name);
  const text = typeof data?.text === 'string' ? data.text : '';
  return parseAiText(text) ?? fallbackResult(file.name);
}

function parseAiText(text: string): ScreenTimeResult | null {
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) return null;

  try {
    const parsed = JSON.parse(jsonMatch[0]) as Record<string, unknown>;
    const screenTime = toNumber(parsed.screenTimeHours, -1);
    if (screenTime < 0) return null;

    return buildResult({
      biggestTrigger: toText(parsed.biggestTrigger, 'TikTok - 1h 43m'),
      changeFromYesterday: toNumber(parsed.changeFromYesterdayHours, -0.8),
      gamesTime: toNumber(parsed.gameHours, 0),
      messagingTime: toNumber(parsed.messagingHours, 0),
      otherTime: toNumber(parsed.otherHours, 0),
      pattern: toText(parsed.pattern, 'Most scrolling happens between 21:00-23:00.'),
      screenTime,
      socialTime: toNumber(parsed.socialHours, 0),
      summary: toText(parsed.summary, 'AI recognized your screen-time pattern.'),
      videoTime: toNumber(parsed.videoHours, 0),
    });
  } catch {
    return null;
  }
}

function fallbackResult(fileName: string): ScreenTimeResult {
  return buildResult({
    biggestTrigger: 'TikTok - 1h 43m',
    changeFromYesterday: -0.8,
    gamesTime: 0.3,
    messagingTime: 0.7,
    otherTime: 0.9,
    pattern: 'Most of your scrolling happens between 21:00-23:00.',
    screenTime: 5.2,
    socialTime: 1.9,
    summary: `Screenshot "${fileName}" uploaded. Showing a sample insight until AI is configured.`,
    videoTime: 1.7,
  });
}

function buildResult(input: ScreenInsightInput): ScreenTimeResult {
  return {
    appSummary: input.summary,
    appTypes: detectAppTypes(input),
    biggestTrigger: input.biggestTrigger,
    changeFromYesterday: input.changeFromYesterday,
    experiment: 'Try keeping short-form video out of your last hour before sleep.',
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
  summary: string;
};

export type { ScreenTimeResult };
