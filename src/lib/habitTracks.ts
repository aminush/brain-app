type HabitTrackId = 'focus' | 'digital_reset' | 'discipline' | 'recovery' | 'memory';

type HabitDay = {
  day: number;
  detail: string;
  task: string;
  title: string;
};

type HabitTrack = {
  color: string;
  days: HabitDay[];
  description: string;
  emoji: string;
  id: HabitTrackId;
  title: string;
};

const HABIT_TRACKS: HabitTrack[] = [
  {
    id: 'focus',
    title: 'Focus',
    emoji: '🧠',
    color: '#8A2BE2',
    description: 'Улучшение внимания и глубина концентрации',
    days: [
      { day: 1, title: 'Точка отсчета', task: 'Засеки время глубокой работы без отвлечений и внеси цифру.', detail: 'Создает объективную точку отсчета без самообмана. Чтобы тренировать навык, нужно знать его базовый уровень. Измерение исходной выносливости внимания помогает ставить реалистичные цели и видеть прогресс.' },
      { day: 2, title: 'Метод 25/5', task: 'Проведи 2 сессии Помодоро (25 мин работы / 5 мин отдыха).', detail: 'Работает по принципу интервальных тренировок. Мозг не может удерживать пиковую концентрацию бесконечно. 5-минутный отдых предотвращает накопление когнитивного утомления и дает дофаминовую перезагрузку перед следующим спринтом.' },
      { day: 3, title: 'Чистый стол', task: 'Убери из поля зрения все предметы, кроме нужных для задачи.', detail: 'Снижает визуальный шум. Каждый предмет в поле зрения - это фоновый раздражитель, который зрительная кора мозга вынуждена обрабатывать. Убирая лишнее, ты высвобождаешь ресурс рабочей памяти для текущей задачи.' },
      { day: 4, title: 'Однозадачность', task: 'Выполни 3 задачи подряд, категорически не переключаясь.', detail: 'Переключение между задачами создает штраф за переключение и оставляемый остаток внимания. Выполнение задач строго по очереди тренирует торможение импульсов и учит мозг работать в режиме глубокой вовлеченности.' },
      { day: 5, title: 'Глубокий блок', task: 'Проведи один 45-минутный блок работы в полной тишине.', detail: 'Вход в состояние потока требует в среднем 15-20 минут полного погружения. 45-минутный блок - это оптимальный отрезок, позволяющий выйти на пиковую продуктивность и решить сложную аналитическую или творческую задачу.' },
      { day: 6, title: 'Фильтрация', task: 'Выпиши главный триггер отвлечения и создай правило защиты.', detail: 'Переводит реактивную борьбу с отвлечениями в проактивную систему. Определение конкретного триггера, например уведомления или шума, и создание правила защищают префронтальную кору от постоянного расхода воли на сопротивление.' },
      { day: 7, title: 'Финал недели', task: 'Проведи повторный тест на удержание фокуса и сравни с Днем 1.', detail: 'Замыкает петлю обратной связи. Видимый прогресс стимулирует выработку дофамина, формируя устойчивую нейронную связь: контроль внимания дает результат и приносит удовлетворение.' },
    ],
  },
  {
    id: 'digital_reset',
    title: 'Digital Reset',
    emoji: '📱',
    color: '#008080',
    description: 'Осознанные цифровые привычки',
    days: [
      { day: 1, title: 'Аудит экрана', task: 'Поставь лимит на самое "прожорливое" приложение.', detail: 'Устраняет слепую зону восприятия. Большинство людей недооценивают свое экранное время в 2-3 раза. Конкретный лимит на главное приложение-раздражитель механически прерывает автоматический скроллинг.' },
      { day: 2, title: 'Безтелефонное утро', task: 'Не бери телефон первые 20 минут после пробуждения.', detail: 'При пробуждении мозг переходит от дельта- и тета-волн к альфа-ритмам. Проверка телефона сразу после сна вызывает выброс кортизола и переводит мозг в реактивный режим, навязывая чужую повестку на весь день.' },
      { day: 3, title: 'Чистка уведомлений', task: 'Отключи push-уведомления во всех некритичных сервисах.', detail: 'Отключает режим гипербдительности. Push-уведомления стимулируют древние механизмы выживания, дергая амигдалу. Без них ты сам решаешь, когда проверять информацию.' },
      { day: 4, title: 'Зона без гаджетов', task: 'Проведи обед без использования любых экранов.', detail: 'Возвращает осознанность в бытовые процессы и улучшает пищеварение. Когда ты ешь без экрана, мозг корректно обрабатывает сигналы сытости от ЖКТ, а психика получает естественную паузу для сенсорной разгрузки.' },
      { day: 5, title: 'Серый экран', task: 'Переведи смартфон в черно-белый режим (Grayscale).', detail: 'Ломает дофаминовые петли интерфейсов. Яркие иконки и красные наклейки уведомлений специально спроектированы для привлечения внимания. В черно-белом режиме экран теряет сверхактивную визуальную привлекательность.' },
      { day: 6, title: 'Вечерний детокс', task: 'Убери все гаджеты за 1 час до сна.', detail: 'Синий свет от экранов подавляет выработку мелатонина - гормона сна, обманывая мозг и имитируя дневной свет. Час без гаджетов перед сном критически важен для глубоких фаз сна и восстановления.' },
      { day: 7, title: 'Цифровой день', task: 'Проведи 4 часа без соцсетей и развлекательного контента.', detail: 'Перезагружает чувствительность дофаминовых рецепторов. Полудневный детокс показывает психике, что базовый уровень удовольствия и спокойствия можно получать от реального мира, а не только от быстрой стимуляции.' },
    ],
  },
  {
    id: 'discipline',
    title: 'Discipline',
    emoji: '🎯',
    color: '#FF4500',
    description: 'Саморегуляция и доведение дел до конца',
    days: [
      { day: 1, title: 'Правило 2 минут', task: 'Сделай быструю задачу до 2 минут прямо сейчас.', detail: 'Разрушает привычку откладывать мелкие дела. Короткие дела, накопленные в течение дня, перегружают рабочую память. Выполнение их здесь и сейчас сохраняет чистоту ментального пространства.' },
      { day: 2, title: 'Съешь лягушку', task: 'Сделай самую неприятную задачу первой с утра.', detail: 'Использует пиковый уровень ресурса префронтальной коры, который максимален утром. Решение самого неприятного дела снимает фоновую тревожность и дает мощный заряд уверенности на весь оставшийся день.' },
      { day: 3, title: 'Фиксация', task: 'Запиши 3 цели и выполни минимум 2 до конца дня.', detail: 'Тренирует субъектность и укрепляет доверие к самому себе. Ограничение списка тремя целями заставляет приоритезировать главное, а доведение до конца формирует паттерн сказал - сделал.' },
      { day: 4, title: 'Борьба с инерцией', task: 'При сопротивлении дай уступку: "Поработаю всего 5 минут".', detail: 'Обходит страх масштаба задачи. Мозг саботирует не саму работу, а прогнозируемые энергозатраты. Договор на всего 5 минут снижает психологический барьер, а вовлечение происходит уже в процессе.' },
      { day: 5, title: 'Пауза импульса', task: 'Задержи отвлечение на 10 секунд и спроси "Зачем?".', detail: 'Вставляет задержку между стимулом и реакцией. 10-секундная пауза переключает управление с автоматических подкорковых импульсов на осознанный контроль префронтальной коры.' },
      { day: 6, title: 'Подготовка среды', task: 'Подготовь рабочее место и список задач с вечера.', detail: 'Снижает трение на старте. Утром уровень силы воли ограничен, и необходимость принимать мелкие решения создает сопротивление. Заготовленный старт убирает этот барьер.' },
      { day: 7, title: 'Ревизия побед', task: 'Запиши 5 завершенных задач за неделю.', detail: 'Закрепляет положительную самооценку и предвзятость подтверждения в сторону собственной эффективной дисциплины. Мозг фиксирует успешный опыт и проще соглашается на дисциплинированное поведение в будущем.' },
    ],
  },
  {
    id: 'recovery',
    title: 'Recovery',
    emoji: '🌿',
    color: '#2E8B57',
    description: 'Восстановление, сон и снижение стресса',
    days: [
      { day: 1, title: 'Окно сна', task: 'Зафиксируй точное время отхода ко сну и подъема.', detail: 'Настраивает циркадные ритмы - внутренние биологические часы организма. Постоянство времени отхода ко сну и подъема оптимизирует выработку гормонов: кортизола утром и мелатонина вечером.' },
      { day: 2, title: 'Теплый свет', task: 'Переключись на приглушенный теплый свет за 2 часа до сна.', detail: 'Сигнализирует эпифизу о наступлении сумерек. Яркий верхний свет блокирует синтез мелатонина, тогда как приглушенный теплый свет снижает уровень возбуждения ЦНС и готовит тело к засыпанию.' },
      { day: 3, title: 'Дыхание 4-7-8', task: 'Сделай 3-минутную сессию глубокого дыхания.', detail: 'Физиологически активирует парасимпатическую нервную систему через стимуляцию блуждающего нерва. Долгий выдох замедляет пульс, снижает артериальное давление и снимает мышечный тонус.' },
      { day: 4, title: 'Сброс мыслей', task: 'Выпиши все тревоги и задачи на лист перед сном.', detail: 'Разгружает рабочую память от эффекта Зейгарник - тенденции помнить незавершенные действия. Перенесение мыслей на бумагу дает мозгу сигнал: информация сохранена, обдумывать ее прямо сейчас не нужно.' },
      { day: 5, title: 'Прогулка в тишине', task: 'Проведи 20 минут на улице без наушников и телефона.', detail: 'Обеспечивает режим работы мозга по умолчанию. Без входящего информационного потока мозг начинает структурировать накопленный опыт, снижая уровень стресса и восстанавливая внимание.' },
      { day: 6, title: 'Климат спальни', task: 'Проветри спальню и обеспечи абсолютную темноту.', detail: 'Физиологическое засыпание сопровождается снижением температуры тела на 1-1.5 °C. Прохлада в спальне ускоряет этот процесс, а полная темнота гарантирует непрерывную выработку мелатонина.' },
      { day: 7, title: 'Аудит энергии', task: 'Оцени уровень энергии от 1 до 10 и найди главный ресурс.', detail: 'Развивает телоцентрированную осознанность - интероцепцию. Понимание того, какие конкретно действия восстанавливают силы, позволяет управлять своими ресурсами проактивно, не доводя до выгорания.' },
    ],
  },
  {
    id: 'memory',
    title: 'Memory & Learning',
    emoji: '🧩',
    color: '#FFD700',
    description: 'Память, усвоение и работа с информацией',
    days: [
      { day: 1, title: 'Воспоминание', task: 'Прочитай материал и выпиши 3 мысли по памяти.', detail: 'Активирует метод Active Recall - активное извлечение. Простое перечитывание создает иллюзию компетентности, а попытка вспомнить суть без подсказок укрепляет нейронные связи и формирует прочные синаптические пути.' },
      { day: 2, title: 'Интервал', task: 'Вспомни ключевые тезисы вчерашнего дня без подсказок.', detail: 'Работает с кривой забывания Эббингауза. Повторение материала именно тогда, когда он начинает забываться, дает сигнал мозгу: эта информация критически важна, ее нужно перевести в долговременную память.' },
      { day: 3, title: 'Метод Фейнмана', task: 'Объясни сложную концепцию простыми словами.', detail: 'Вскрывает пробелы в понимании. Когда ты объясняешь концепцию простыми словами, ты убираешь заученные термины и заставляешь мозг выстроить четкую логическую структуру знания.' },
      { day: 4, title: 'Визуализация', task: 'Нарисуй Mind Map для текущей темы.', detail: 'Подключает пространственное мышление и гиппокамп. Перевод текста в майнд-карту структурирует иерархию данных и задействует визуальную кору, делая запоминание объемным.' },
      { day: 5, title: 'Ассоциации', task: 'Придумай метафоры или мнемоники для 5 терминов.', detail: 'Использует анкоринг - привязку. Новая информация усваивается намного быстрее, если она накладывается на уже имеющиеся нейронные сети через яркие, абсурдные или эмоциональные образные связи.' },
      { day: 6, title: 'Самопроверка', task: 'Составь 5 вопросов по материалу и ответь на них позже.', detail: 'Переключает режим чтения в режим тестирования. Составление вопросов заставляет взглянуть на материал глазами экзаменатора, а последующий ответ укрепляет метапознание: понимание того, что ты знаешь, а что нет.' },
      { day: 7, title: 'Практика', task: 'Сформулируй, как применить новые знания на практике.', detail: 'Переводит абстрактное знание в процедурную память и навык. Информация без практического применения быстро утилизируется мозгом за ненадобностью. Применение создает реальный контекст использования.' },
    ],
  },
];

const HABIT_TRACKS_EN: HabitTrack[] = [
  {
    id: 'focus',
    title: 'Focus',
    emoji: '🧠',
    color: '#8A2BE2',
    description: 'Better attention and deeper concentration',
    days: [
      { day: 1, title: 'Baseline', task: 'Time how long you can do deep work without distractions.', detail: 'A clear baseline shows your real attention endurance and makes progress visible.' },
      { day: 2, title: '25/5 method', task: 'Complete 2 Pomodoro sessions: 25 minutes work, 5 minutes rest.', detail: 'Short recovery breaks reduce cognitive fatigue and help the next focus sprint feel possible.' },
      { day: 3, title: 'Clean desk', task: 'Remove everything from view except what you need for one task.', detail: 'Less visual noise means less background processing and more working memory for the task.' },
      { day: 4, title: 'Single-tasking', task: 'Finish 3 tasks in a row without switching.', detail: 'Task switching leaves attention residue. One task at a time trains impulse control.' },
      { day: 5, title: 'Deep block', task: 'Do one 45-minute work block in full quiet.', detail: 'A longer quiet block gives the brain enough time to enter a deeper flow state.' },
      { day: 6, title: 'Filtering', task: 'Name your main distraction trigger and create one protection rule.', detail: 'Turning a trigger into a rule protects attention before willpower has to fight.' },
      { day: 7, title: 'Week finale', task: 'Repeat your focus test and compare it with Day 1.', detail: 'Visible progress closes the feedback loop and makes attention training feel rewarding.' },
    ],
  },
  {
    id: 'digital_reset',
    title: 'Digital Reset',
    emoji: '📱',
    color: '#008080',
    description: 'More intentional digital habits',
    days: [
      { day: 1, title: 'Screen audit', task: 'Set a limit on your most time-hungry app.', detail: 'A concrete limit interrupts automatic scrolling and makes screen time visible.' },
      { day: 2, title: 'Phone-free morning', task: 'Do not pick up your phone for the first 20 minutes after waking.', detail: 'A calmer morning protects your nervous system from starting the day in reaction mode.' },
      { day: 3, title: 'Notification cleanup', task: 'Turn off push notifications for every non-critical app.', detail: 'Fewer alerts means you choose when to check information instead of being pulled into it.' },
      { day: 4, title: 'No-screen zone', task: 'Eat one meal without any screens.', detail: 'A screen-free meal gives your brain a natural sensory pause and improves awareness.' },
      { day: 5, title: 'Grayscale', task: 'Switch your phone to black-and-white mode.', detail: 'Removing bright colors makes apps less visually tempting and weakens dopamine loops.' },
      { day: 6, title: 'Evening detox', task: 'Put all devices away 1 hour before sleep.', detail: 'Less blue light before bed supports melatonin and better deep sleep.' },
      { day: 7, title: 'Digital window', task: 'Spend 4 hours without social media or entertainment feeds.', detail: 'A short reset helps your brain relearn calm from the real world, not only fast stimulation.' },
    ],
  },
  {
    id: 'discipline',
    title: 'Discipline',
    emoji: '🎯',
    color: '#FF4500',
    description: 'Self-regulation and finishing what you start',
    days: [
      { day: 1, title: '2-minute rule', task: 'Do one task that takes under 2 minutes right now.', detail: 'Tiny unfinished tasks overload working memory. Finishing one removes friction.' },
      { day: 2, title: 'Eat the frog', task: 'Do the most uncomfortable task first in the morning.', detail: 'Handling the hardest task early lowers background anxiety for the rest of the day.' },
      { day: 3, title: 'Commitment', task: 'Write 3 goals and complete at least 2 before the day ends.', detail: 'Small promises kept build trust in yourself and train follow-through.' },
      { day: 4, title: 'Beat inertia', task: 'When you resist a task, say: "I will work for only 5 minutes."', detail: 'A 5-minute deal lowers the starting barrier. Momentum often appears after the start.' },
      { day: 5, title: 'Impulse pause', task: 'Delay one distraction for 10 seconds and ask: "Why?"', detail: 'A short pause moves control from automatic impulse to conscious choice.' },
      { day: 6, title: 'Prepare the environment', task: 'Set up your workspace and task list the evening before.', detail: 'A prepared start reduces morning decisions and makes action easier.' },
      { day: 7, title: 'Win review', task: 'Write down 5 tasks you completed this week.', detail: 'Noticing completed work helps your brain remember that discipline creates results.' },
    ],
  },
  {
    id: 'recovery',
    title: 'Recovery',
    emoji: '🌿',
    color: '#2E8B57',
    description: 'Sleep, stress reduction and restoration',
    days: [
      { day: 1, title: 'Sleep window', task: 'Set exact bedtime and wake-up times.', detail: 'Stable sleep timing supports circadian rhythm and better morning energy.' },
      { day: 2, title: 'Warm light', task: 'Use dim warm light for 2 hours before sleep.', detail: 'Warm low light tells the nervous system that the day is ending.' },
      { day: 3, title: '4-7-8 breathing', task: 'Do a 3-minute deep breathing session.', detail: 'Long exhales activate the parasympathetic nervous system and lower tension.' },
      { day: 4, title: 'Thought dump', task: 'Write down every worry and task before bed.', detail: 'Moving thoughts onto paper frees working memory and quiets unfinished loops.' },
      { day: 5, title: 'Silent walk', task: 'Walk outside for 20 minutes without headphones or your phone.', detail: 'A low-input walk gives the mind space to process stress and restore attention.' },
      { day: 6, title: 'Bedroom climate', task: 'Air out your room and make it fully dark.', detail: 'Cool air and darkness support deeper sleep and recovery.' },
      { day: 7, title: 'Energy audit', task: 'Rate your energy from 1 to 10 and find your top recovery source.', detail: 'Knowing what restores you helps prevent burnout before it starts.' },
    ],
  },
  {
    id: 'memory',
    title: 'Memory & Learning',
    emoji: '🧩',
    color: '#FFD700',
    description: 'Memory, learning and information processing',
    days: [
      { day: 1, title: 'Recall', task: 'Read material and write 3 ideas from memory.', detail: 'Active recall strengthens learning more than passive rereading.' },
      { day: 2, title: 'Spacing', task: 'Recall yesterday’s key points without hints.', detail: 'Spaced repetition tells the brain that this information should stay.' },
      { day: 3, title: 'Feynman method', task: 'Explain a difficult concept in simple words.', detail: 'Simple explanation exposes gaps and forces a clean structure of understanding.' },
      { day: 4, title: 'Visualization', task: 'Draw a mind map for your current topic.', detail: 'Turning text into a map uses spatial thinking and makes memory more connected.' },
      { day: 5, title: 'Associations', task: 'Create metaphors or mnemonics for 5 terms.', detail: 'New ideas stick faster when they connect to vivid existing images.' },
      { day: 6, title: 'Self-test', task: 'Write 5 questions about the material and answer them later.', detail: 'Testing yourself builds metacognition: what you know and what still needs work.' },
      { day: 7, title: 'Practice', task: 'Write how you can use this knowledge in real life.', detail: 'Applying knowledge gives it context and helps turn theory into skill.' },
    ],
  },
];

function getHabitTracks(language: 'eng' | 'рус') {
  return language === 'eng' ? HABIT_TRACKS_EN : HABIT_TRACKS;
}

export { HABIT_TRACKS, getHabitTracks };
export type { HabitDay, HabitTrack, HabitTrackId };
