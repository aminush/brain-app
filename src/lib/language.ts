const languages = ['eng', 'рус'] as const;

type Language = (typeof languages)[number];

const text = {
  eng: {
    analyze: 'AI Vision is analyzing...',
    authChoiceText: 'Create a new account or log in if you already have one.',
    authChoiceTitle: 'How do you want to start?',
    back: '← Back',
    brainCondition: 'Brain condition',
    checkIn: 'Quick Daily Check-in',
    focus: 'Focus',
    health: 'PFC health',
    homeTitle: 'In a dopamine fog',
    journal: 'State journal & grounding',
    landingEyebrow: 'Neuro reboot protocol',
    landingTitle: "Your brain is not broken. It's just overloaded.",
    landingText:
      'Get back your attention, self-control, and implement new activities instead of endless scrolling.',
    login: 'Log in',
    logout: 'Log out',
    mode: 'Mode',
    myBrain: 'My Brain',
    pfc: 'Prefrontal cortex (PFC)',
    science: 'Science',
    screenshot: 'Upload screen time screenshot',
    signup: 'Sign up',
    start: 'Start reboot',
    tracker: 'Tracker',
    training: 'Training',
    weakZone: 'Vulnerable zone',
  },
  рус: {
    analyze: 'AI Vision анализирует...',
    authChoiceText: 'Создай новый аккаунт или войди, если аккаунт уже есть.',
    authChoiceTitle: 'Как хочешь начать?',
    back: '← Назад',
    brainCondition: 'Состояние мозга',
    checkIn: 'Быстрый Daily Check-in',
    focus: 'Фокус',
    health: 'Здоровье ПФК',
    homeTitle: 'В дофаминовом тумане',
    journal: 'Дневник состояний & заземление',
    landingEyebrow: 'Протокол нейро-перезагрузки',
    landingTitle: 'Твой мозг не сломан. Он просто перегружен.',
    landingText:
      'Верни внимание, самоконтроль и новые полезные действия вместо бесконечной прокрутки.',
    login: 'Войти',
    logout: 'Выйти',
    mode: 'Режим',
    myBrain: 'Мой Мозг',
    pfc: 'Префронтальная кора (ПФК)',
    science: 'Наука',
    screenshot: 'Загрузить скриншот экранного времени',
    signup: 'Регистрация',
    start: 'Начать reboot',
    tracker: 'Трекер',
    training: 'Тренировки',
    weakZone: 'Уязвимая зона',
  },
} satisfies Record<Language, Record<string, string>>;

export { languages, text };
export type { Language };
