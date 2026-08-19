type ScienceSection = {
  body: string;
  title: string;
};

type ScienceArticle = {
  action: string;
  proof?: string;
  read: string;
  sections: ScienceSection[];
  title: string;
};

const SCIENCE_ARTICLES: ScienceArticle[] = [
  {
    action: 'Wait 60 seconds before opening the app.',
    proof: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11236742/',
    read: '3 min read',
    title: 'Why your brain wants to scroll',
    sections: [
      {
        title: 'What happens',
        body: 'Every swipe or short video activates the brain reward system, especially the ventral tegmental area (VTA) and the nucleus accumbens. Dopamine is released less from the information itself and more from the anticipation of novelty.',
      },
      {
        title: 'Why long tasks feel boring',
        body: 'When the brain gets used to fast, high-amplitude dopamine stimulation, D2 receptor sensitivity can drop. As a result, reading, deep studying, and writing code can start feeling too slow for the brain.',
      },
      {
        title: 'Mini tip',
        body: 'Practice a dopamine pause: before opening an app, wait 60 seconds. This breaks the automatic stimulus-response loop and gradually gives control back to the prefrontal cortex.',
      },
    ],
  },
  {
    action: 'Close the material and summarize the main idea in your own words.',
    proof: 'https://www.science.org/doi/10.1126/science.1207745',
    read: '3 min read',
    title: 'Why focus feels fragile',
    sections: [
      {
        title: 'The Google effect',
        body: 'When information is instantly available, the brain uses a strategy called transactive memory. The hippocampus may encode the path to information, such as a link, keyword, or folder, more than the content itself.',
      },
      {
        title: 'Why focus breaks',
        body: 'Constant context switching increases the cognitive load on working memory. The prefrontal cortex spends resources holding external markers instead of supporting deep processing and stable long-term learning.',
      },
      {
        title: 'Mini tip',
        body: 'Use Active Recall: close the material and write the main idea in your own words instead of rereading or googling the answer right away.',
      },
    ],
  },
  {
    action: 'Turn screens off 60 minutes before sleep.',
    proof: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4286245/',
    read: '3 min read',
    title: 'Sleep is focus training',
    sections: [
      {
        title: 'Sleep cleans and trains the brain',
        body: 'Sleep is a period of active neuroplasticity and brain cleanup. During slow-wave NREM sleep, the glymphatic system helps remove metabolic waste, including beta-amyloid.',
      },
      {
        title: 'Focus and emotions are connected',
        body: 'Sleep loss weakens functional connectivity between the prefrontal cortex and the amygdala. The prefrontal cortex becomes worse at calming emotional and impulsive signals, so anxiety rises and voluntary attention drops.',
      },
      {
        title: 'Mini tip',
        body: 'Create a digital sunset: turn screens off 60 minutes before bed and keep your phone away from the bed so blue light does not disrupt melatonin production.',
      },
    ],
  },
  {
    action: 'Take a 10-minute walk after studying or deep work.',
    read: '3 min read',
    title: 'How steps affect the brain',
    sections: [
      {
        title: 'BDNF and memory',
        body: 'Regular walking and aerobic activity stimulate neurotrophic proteins, especially BDNF. This factor supports neurogenesis in the hippocampus, a brain structure involved in memory, learning, and spatial orientation.',
      },
      {
        title: 'Blood flow and mental clarity',
        body: 'Physical activity increases cerebral blood flow, brings oxygen and glucose to brain tissue, supports dopamine, serotonin, and norepinephrine, and helps lower cortisol.',
      },
      {
        title: 'Mini tip',
        body: 'Aim for 8000-10000 steps a day and take 10-minute walks outside after long deep-work sessions. This can help consolidate what you learned.',
      },
    ],
  },
  {
    action: 'At the end of the day, write 3 tasks for tomorrow and one strong emotion from today.',
    read: '3 min read',
    title: 'Why writing emotions and tasks helps',
    sections: [
      {
        title: 'Tasks unload working memory',
        body: 'Working memory can hold only a limited number of items. When every task stays in your head, the Zeigarnik effect creates background mental noise and anxiety. A brain dump moves information to an external place and frees prefrontal resources.',
      },
      {
        title: 'Emotions become easier to regulate',
        body: 'During strong emotions, the amygdala can become overactive. Writing feelings by hand supports expressive writing and affect labeling: naming emotions activates the prefrontal cortex and can reduce stress intensity.',
      },
      {
        title: 'Mini tip',
        body: 'Spend 5 minutes in the evening: write 3 key tasks for tomorrow and briefly note one event that caused a strong emotional reaction.',
      },
    ],
  },
];

const SCIENCE_ARTICLES_RU: ScienceArticle[] = [
  {
    action: 'Подожди 60 секунд перед открытием приложения.',
    proof: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11236742/',
    read: '3 мин чтения',
    title: 'Почему мозг хочет скроллить',
    sections: [
      {
        title: 'Что происходит',
        body: 'Каждый свайп или короткое видео активирует систему вознаграждения мозга, особенно VTA и прилежащее ядро. Дофамин выделяется не только из-за контента, но и из-за ожидания новизны.',
      },
      {
        title: 'Почему длинные задачи скучные',
        body: 'Когда мозг привыкает к быстрой стимуляции, чтение, учёба и код могут казаться слишком медленными. Поэтому фокус начинает ломаться быстрее.',
      },
      {
        title: 'Мини-совет',
        body: 'Сделай дофаминовую паузу: перед открытием приложения подожди 60 секунд. Это разрывает автоматическую цепочку стимул-реакция.',
      },
    ],
  },
  {
    action: 'Закрой материал и перескажи главную идею своими словами.',
    proof: 'https://www.science.org/doi/10.1126/science.1207745',
    read: '3 мин чтения',
    title: 'Почему фокус кажется хрупким',
    sections: [
      {
        title: 'Google-эффект',
        body: 'Когда информация всегда доступна, мозг чаще запоминает путь к ней: ссылку, ключевое слово или папку, а не саму суть.',
      },
      {
        title: 'Почему внимание рвётся',
        body: 'Постоянное переключение задач перегружает рабочую память. Префронтальная кора тратит ресурс на внешние маркеры вместо глубокого понимания.',
      },
      {
        title: 'Мини-совет',
        body: 'Используй Active Recall: закрой материал и выпиши главную мысль своими словами вместо перечитывания.',
      },
    ],
  },
  {
    action: 'Выключи экраны за 60 минут до сна.',
    proof: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC4286245/',
    read: '3 мин чтения',
    title: 'Сон тренирует фокус',
    sections: [
      {
        title: 'Сон очищает и тренирует мозг',
        body: 'Во сне мозг не выключается: он восстанавливается, укрепляет связи и убирает метаболический шум, особенно во время глубокого NREM-сна.',
      },
      {
        title: 'Фокус и эмоции связаны',
        body: 'Недосып ослабляет связь между префронтальной корой и амигдалой. Из-за этого тревога растёт, а произвольное внимание падает.',
      },
      {
        title: 'Мини-совет',
        body: 'Сделай цифровой закат: выключи экраны за 60 минут до сна и убери телефон подальше от кровати.',
      },
    ],
  },
  {
    action: 'Прогуляйся 10 минут после учёбы или глубокой работы.',
    read: '3 мин чтения',
    title: 'Как шаги влияют на мозг',
    sections: [
      {
        title: 'BDNF и память',
        body: 'Ходьба и аэробная активность поддерживают нейротрофические факторы, особенно BDNF. Это помогает гиппокампу, который связан с памятью и обучением.',
      },
      {
        title: 'Кровоток и ясность',
        body: 'Движение улучшает кровоток, приносит мозгу кислород и глюкозу, поддерживает нейромедиаторы и помогает снижать стресс.',
      },
      {
        title: 'Мини-совет',
        body: 'Стремись к 8000-10000 шагам в день и делай короткие прогулки после долгих учебных блоков.',
      },
    ],
  },
  {
    action: 'В конце дня запиши 3 задачи на завтра и одну сильную эмоцию дня.',
    read: '3 мин чтения',
    title: 'Почему запись эмоций и задач помогает',
    sections: [
      {
        title: 'Задачи разгружают память',
        body: 'Когда все дела остаются в голове, эффект Зейгарник создаёт фоновый шум и тревогу. Запись переносит нагрузку наружу.',
      },
      {
        title: 'Эмоции легче регулировать',
        body: 'Называние эмоций включает префронтальную кору и помогает снизить интенсивность переживания.',
      },
      {
        title: 'Мини-совет',
        body: 'Потрать 5 минут вечером: запиши 3 ключевые задачи на завтра и одно событие, которое вызвало сильную эмоцию.',
      },
    ],
  },
];

function getScienceArticles(language: 'eng' | 'рус') {
  return language === 'eng' ? SCIENCE_ARTICLES : SCIENCE_ARTICLES_RU;
}

export { SCIENCE_ARTICLES, getScienceArticles };
export type { ScienceArticle };
