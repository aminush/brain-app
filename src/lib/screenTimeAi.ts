import { isSupabaseConfigured, supabase } from './supabase';

type ScreenTimeResult = {
  appSummary: string;
  screenTime: number;
};

export async function analyzeScreenTimeImage(file: File): Promise<ScreenTimeResult> {
  if (!isSupabaseConfigured) return fallbackResult(file.name);

  const imageBase64 = await fileToBase64(file);
  const { data, error } = await supabase.functions.invoke('ai', {
    body: {
      imageBase64,
      imageMime: file.type || 'image/png',
      prompt: 'Прочитай скриншот экранного времени. Верни кратко: приложения и часы. Оцени общий screenTimeHours числом.',
      system: 'Ты анализируешь скриншот Screen Time. Ответь JSON: {"screenTimeHours": number, "summary": string}.',
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
    const parsed = JSON.parse(jsonMatch[0]) as { screenTimeHours?: unknown; summary?: unknown };
    if (typeof parsed.screenTimeHours !== 'number') return null;
    return {
      appSummary: typeof parsed.summary === 'string' ? parsed.summary : 'AI прочитал скриншот.',
      screenTime: Math.max(0, Math.min(15, parsed.screenTimeHours)),
    };
  } catch {
    return null;
  }
}

function fallbackResult(fileName: string): ScreenTimeResult {
  return {
    appSummary: `Скриншот "${fileName}" загружен. Пока ставлю примерную оценку.`,
    screenTime: 6,
  };
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
