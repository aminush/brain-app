type PermissionStatus = {
  granted?: boolean;
  status?: string;
};

type StepCountResult = {
  steps: number;
};

type ExpoPedometer = {
  getStepCountAsync: (start: Date, end: Date) => Promise<StepCountResult>;
  isAvailableAsync?: () => Promise<boolean>;
  requestPermissionsAsync: () => Promise<PermissionStatus>;
};

type PedometerResult = {
  message: string;
  source: 'native' | 'manual';
  steps: number;
};

type PedometerLanguage = 'eng' | 'рус';

export async function readTodaySteps(language: PedometerLanguage): Promise<PedometerResult> {
  const copy = messages[language];
  const pedometer = await loadExpoPedometer();
  if (!pedometer) return unavailable(copy.unavailable);

  const isAvailable = await pedometer.isAvailableAsync?.();
  if (isAvailable === false) return unavailable(copy.unavailable);

  const permission = await pedometer.requestPermissionsAsync();
  if (!permission.granted && permission.status !== 'granted') {
    return {
      message: copy.denied,
      source: 'manual',
      steps: 0,
    };
  }

  const { steps } = await pedometer.getStepCountAsync(startOfToday(), new Date());
  return {
    message: copy.success,
    source: 'native',
    steps,
  };
}

function unavailable(message: string): PedometerResult {
  return { message, source: 'manual', steps: 0 };
}

async function loadExpoPedometer() {
  const dynamicImport = new Function('name', 'return import(name)') as (
    name: string,
  ) => Promise<unknown>;
  const packages = ['expo-pedometer', 'expo-sensors'];

  for (const packageName of packages) {
    try {
      const pedometer = normalizePedometer(await dynamicImport(packageName));
      if (pedometer) return pedometer;
    } catch {
      // The web app usually does not have Expo native modules installed.
    }
  }

  return null;
}

function normalizePedometer(module: unknown): ExpoPedometer | null {
  if (!isRecord(module)) return null;
  const candidate = module.Pedometer ?? module;
  if (!isRecord(candidate)) return null;
  if (
    typeof candidate.getStepCountAsync !== 'function'
    || typeof candidate.requestPermissionsAsync !== 'function'
  ) {
    return null;
  }

  return candidate as ExpoPedometer;
}

function startOfToday() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export type { PedometerResult };

const messages = {
  eng: {
    denied: 'No access to motion sensors. Enter steps manually.',
    success: 'Steps were read from the motion sensor.',
    unavailable: 'The pedometer is unavailable in the browser. Enter steps manually.',
  },
  рус: {
    denied: 'Нет доступа к датчикам движения. Введи шаги вручную.',
    success: 'Шаги считаны с датчика движения.',
    unavailable: 'Шагомер недоступен в браузере. Введи шаги вручную.',
  },
} satisfies Record<PedometerLanguage, Record<string, string>>;
