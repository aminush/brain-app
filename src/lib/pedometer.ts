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

const unavailable: PedometerResult = {
  message: 'Шагомер недоступен в браузере. Введи шаги вручную.',
  source: 'manual',
  steps: 0,
};

export async function readTodaySteps(): Promise<PedometerResult> {
  const pedometer = await loadExpoPedometer();
  if (!pedometer) return unavailable;

  const isAvailable = await pedometer.isAvailableAsync?.();
  if (isAvailable === false) return unavailable;

  const permission = await pedometer.requestPermissionsAsync();
  if (!permission.granted && permission.status !== 'granted') {
    return {
      message: 'Нет доступа к датчикам движения. Введи шаги вручную.',
      source: 'manual',
      steps: 0,
    };
  }

  const { steps } = await pedometer.getStepCountAsync(startOfToday(), new Date());
  return {
    message: 'Шаги считаны с датчика движения.',
    source: 'native',
    steps,
  };
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
