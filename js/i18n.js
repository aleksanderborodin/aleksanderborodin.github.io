/* ============================================
   i18n — English / Russian translations
   ============================================ */

const translations = {
  en: {
    // Nav
    nav_home: "Home",
    nav_scientist: "Science",
    nav_contributor: "Open Source",
    nav_professional: "Commercial",

    // Landing
    landing_greeting: "Hello, I'm",
    landing_name: "Aleksander Borodin",
    landing_role: "NLP / AI Developer",
    landing_intro: "MIPT student blending mathematics, machine learning, and a relentless curiosity for how language models think — and how to break them.",
    landing_explore: "Explore my world",

    // Portal cards
    portal_scientist_title: "Science",
    portal_scientist_desc: "Research in LLM safety, jailbreaking, and knowledge extraction. Where curiosity meets rigor.",
    portal_scientist_cta: "View Research",

    portal_contributor_title: "Open Source",
    portal_contributor_desc: "Open-source tools — from evolutionary AI agents to browser extensions that decode legalese.",
    portal_contributor_cta: "View Projects",

    portal_professional_title: "Commercial",
    portal_professional_desc: "Real-world impact: optimization algorithms, RAG systems, and data pipelines for production.",
    portal_professional_cta: "View Experience",

    // Scientist page
    sci_hero_title: "Research & Science",
    sci_hero_desc: "Exploring the boundaries of language model safety, knowledge extraction, and applied NLP. Every experiment is a question — every result, a new direction.",
    sci_label: "Research Projects",

    sci_proj1_title: "Prefix Injection Jailbreak",
    sci_proj1_desc: "Researched prefix attacks on LLMs inspired by BBC's Choice Blindness experiments. By simulating the start of a model's response to a forbidden query, models like Gemini 2.5 Pro and DeepSeek R1 were tricked into completing harmful answers — achieving near-100% success on MaliciousInstruct vs. near-zero baseline.",
    sci_proj1_stack: "Python · LLM APIs · Prompt Engineering",

    sci_proj2_title: "Edu Parser — Knowledge Graph Extraction",
    sci_proj2_desc: "Built a system that parses lecture notes into entities and infers prerequisite relationships using BM25, embeddings, and LLM-based verification. Applied to 2 years of MIPT math notes — became the foundation for a flashcard-based lifelong learning app.",
    sci_proj2_stack: "Python · BM25 · Embeddings · LLM · NetworkX",

    sci_education_label: "Education",
    sci_education_degree: "Bachelor's degree (in progress)",
    sci_education_school: "FPMI MIPT — Applied Mathematics and Computer Science",
    sci_education_gpa: "GPA: 7.8 / 10",
    sci_education_courses: "Relevant: Math Analysis, Probability Theory, Linear Algebra, Computational Complexity, Algorithms, ML, Physics, Economics",

    sci_achievements_label: "Achievements",
    sci_achievement_1: "Winner — International Experimental Physics Olympiad (IEPhO), 2023",
    sci_achievement_2: "Prize-winner — All-Russian Physics Olympiad, Grade 10 (2022) & Grade 11 (2023)",
    sci_achievement_3: "Winner — Team Wiki-races, Sirius, 2023",

    // Contributor page
    contrib_hero_title: "Open Source",
    contrib_hero_desc: "Building tools that solve real problems — then sharing them with the world. From multi-agent AI systems to browser extensions that protect users.",
    contrib_label: "Projects",

    contrib_proj1_title: "Idea Evolve",
    contrib_proj1_desc: "Evolutionary code optimization through collaborative AI agent work sessions. Multiple specialized Claude agents (architects, explorers, researchers) work in parallel to evolve increasingly better solutions to hard optimization problems.",
    contrib_proj1_stack: "Python · Claude API · Evolutionary Algorithms",

    contrib_proj2_title: "Yoola Explain",
    contrib_proj2_desc: "A browser extension that simplifies Terms of Service by providing AI-generated summaries. Extracts ToS text, sends it to an LLM via OpenRouter, and returns structured summaries with key points, data collection info, and warnings. Multi-language support with caching.",
    contrib_proj2_stack: "JavaScript · FastAPI · SQLite · OpenRouter",

    contrib_proj3_title: "Edu Parser",
    contrib_proj3_desc: "Open-source system for automatic analysis of educational content — extracting knowledge entities and prerequisite relationships from lecture materials using NLP and vector embeddings.",
    contrib_proj3_stack: "Python · BM25 · Embeddings · LLM",

    contrib_proj4_title: "Medic",
    contrib_proj4_desc: "Telegram bot that orchestrates a group of AI agents working together. Open-source framework for multi-agent collaboration via messaging.",
    contrib_proj4_stack: "Python · Telegram API · AI Agents",

    contrib_proj5_title: "Flash Cards",
    contrib_proj5_desc: "A flashcard-based learning application designed for spaced repetition and knowledge retention.",
    contrib_proj5_stack: "Python",

    contrib_github_label: "GitHub Profile",
    contrib_github_stats: "12 public repositories",
    contrib_github_cta: "View on GitHub",

    // Professional page
    prof_hero_title: "Professional Work",
    prof_hero_desc: "Delivering measurable business impact through AI, optimization, and data engineering. Building systems that generate real value.",
    prof_label: "Experience",

    prof_job1_title: "Model & Algorithm Developer",
    prof_job1_company: "Royal Credit Bank (Client Project)",
    prof_job1_period: "2024 — 2025",
    prof_job1_item1: "Developed and simulated a cash collection optimization algorithm; analysis of historical data projected a 20M RUB annual profit increase.",
    prof_job1_item2: "Engineered a web scraping and analysis system to extract key data from the central bank's website that was unavailable via API.",
    prof_job1_item3: "Built an internal RAG system to support business operations with document-based Q&A.",
    prof_job1_stack: "Python · NumPy · Pandas · RAG · Web Scraping",

    prof_job2_title: "Project Manager / Vibe-Coder",
    prof_job2_company: "ModelGate.ru",
    prof_job2_period: "2025 — Present",
    prof_job2_desc: "LLM API gateway and proxy service. Managing product development and building features with AI-assisted coding workflows.",
    prof_job2_stack: "Python · LLM APIs · Product Management",

    prof_skills_label: "Technical Skills",
    prof_skill_programming: "Programming",
    prof_skill_programming_val: "Python (advanced) · C++ (intermediate) · C · Assembler",
    prof_skill_data: "Data / ML",
    prof_skill_data_val: "PyTorch · NumPy · Pandas · PostgreSQL · Matplotlib · Excel",
    prof_skill_nlp: "NLP / LLM",
    prof_skill_nlp_val: "BM25 · Embeddings · RAG · LLM APIs · Evaluation · Prompt Engineering",
    prof_skill_backend: "Backend",
    prof_skill_backend_val: "FastAPI · LangChain · LangGraph",
    prof_skill_systems: "Systems",
    prof_skill_systems_val: "Linux (home server admin, workstation usage)",

    prof_contact_label: "Get in Touch",
    prof_contact_desc: "Interested in collaboration or have a project in mind? Let's talk.",
    prof_download_cv: "Download CV",
    prof_email: "Email me",

    // Footer
    footer_copy: "Aleksander Borodin",
    footer_built: "Built with curiosity",

    // Common
    view_on_github: "View on GitHub",
    back_home: "Back to Home",
    logo_text: "AB",
  },

  ru: {
    // Nav
    nav_home: "Главная",
    nav_scientist: "Наука",
    nav_contributor: "Open Source",
    nav_professional: "Коммерция",

    // Landing
    landing_greeting: "Привет, я",
    landing_name: "Александр Бородин",
    landing_role: "NLP / AI Разработчик",
    landing_intro: "Студент МФТИ на стыке математики, машинного обучения и неугасимого интереса к тому, как думают языковые модели — и как их взламывать.",
    landing_explore: "Исследуйте мой мир",

    // Portal cards
    portal_scientist_title: "Наука",
    portal_scientist_desc: "Исследования безопасности LLM, джейлбрейкинг и извлечение знаний. Там, где любопытство встречает строгость.",
    portal_scientist_cta: "Исследования",

    portal_contributor_title: "Open Source",
    portal_contributor_desc: "Инструменты с открытым кодом — от эволюционных ИИ-агентов до расширений, расшифровывающих юридический язык.",
    portal_contributor_cta: "Проекты",

    portal_professional_title: "Коммерция",
    portal_professional_desc: "Реальное влияние: алгоритмы оптимизации, RAG-системы и пайплайны данных для продакшена.",
    portal_professional_cta: "Опыт работы",

    // Scientist page
    sci_hero_title: "Наука и исследования",
    sci_hero_desc: "Исследование границ безопасности языковых моделей, извлечения знаний и прикладного NLP. Каждый эксперимент — это вопрос, каждый результат — новое направление.",
    sci_label: "Исследовательские проекты",

    sci_proj1_title: "Prefix Injection Jailbreak",
    sci_proj1_desc: "Исследование префиксных атак на LLM, вдохновлённое экспериментами BBC по Choice Blindness. Имитируя начало ответа модели на запрещённый запрос, модели Gemini 2.5 Pro и DeepSeek R1 давали вредоносные ответы — почти 100% успех на MaliciousInstruct против нулевого базового уровня.",
    sci_proj1_stack: "Python · LLM API · Prompt Engineering",

    sci_proj2_title: "Edu Parser — Граф знаний",
    sci_proj2_desc: "Система парсинга лекционных заметок в сущности и определения пререквизитных связей с помощью BM25, эмбеддингов и LLM-верификации. Применена к 2 годам математических заметок МФТИ — стала основой приложения для обучения на основе флэш-карт.",
    sci_proj2_stack: "Python · BM25 · Эмбеддинги · LLM · NetworkX",

    sci_education_label: "Образование",
    sci_education_degree: "Бакалавриат (в процессе)",
    sci_education_school: "ФПМИ МФТИ — Прикладная математика и информатика",
    sci_education_gpa: "Средний балл: 7.8 / 10",
    sci_education_courses: "Профильные: Матанализ, Теория вероятностей, Линейная алгебра, Вычислительная сложность, Алгоритмы, ML, Физика, Экономика",

    sci_achievements_label: "Достижения",
    sci_achievement_1: "Победитель — Международная экспериментальная олимпиада по физике (IEPhO), 2023",
    sci_achievement_2: "Призёр — Всероссийская олимпиада по физике, 10 класс (2022) и 11 класс (2023)",
    sci_achievement_3: "Победитель — командные Wiki-гонки, Сириус, 2023",

    // Contributor page
    contrib_hero_title: "Open Source",
    contrib_hero_desc: "Создание инструментов, решающих реальные проблемы — и их открытие для мира. От мульти-агентных ИИ-систем до браузерных расширений, защищающих пользователей.",
    contrib_label: "Проекты",

    contrib_proj1_title: "Idea Evolve",
    contrib_proj1_desc: "Эволюционная оптимизация кода через совместные рабочие сессии ИИ-агентов. Специализированные агенты Claude (архитекторы, исследователи) работают параллельно, эволюционируя решения сложных задач оптимизации.",
    contrib_proj1_stack: "Python · Claude API · Эволюционные алгоритмы",

    contrib_proj2_title: "Yoola Explain",
    contrib_proj2_desc: "Браузерное расширение, упрощающее пользовательские соглашения с помощью ИИ-генерируемых резюме. Извлекает текст ToS, отправляет в LLM через OpenRouter и возвращает структурированные сводки с ключевыми пунктами и предупреждениями. Мультиязычность и кэширование.",
    contrib_proj2_stack: "JavaScript · FastAPI · SQLite · OpenRouter",

    contrib_proj3_title: "Edu Parser",
    contrib_proj3_desc: "Открытая система автоматического анализа образовательного контента — извлечение сущностей знаний и пререквизитных связей из лекционных материалов с помощью NLP и векторных представлений.",
    contrib_proj3_stack: "Python · BM25 · Эмбеддинги · LLM",

    contrib_proj4_title: "Medic",
    contrib_proj4_desc: "Телеграм-бот, оркестрирующий группу ИИ-агентов для совместной работы. Открытый фреймворк для мульти-агентного взаимодействия через мессенджер.",
    contrib_proj4_stack: "Python · Telegram API · ИИ-агенты",

    contrib_proj5_title: "Flash Cards",
    contrib_proj5_desc: "Приложение для обучения на основе флэш-карт с интервальным повторением и удержанием знаний.",
    contrib_proj5_stack: "Python",

    contrib_github_label: "Профиль GitHub",
    contrib_github_stats: "12 публичных репозиториев",
    contrib_github_cta: "Открыть GitHub",

    // Professional page
    prof_hero_title: "Профессиональный опыт",
    prof_hero_desc: "Измеримое влияние на бизнес через ИИ, оптимизацию и инженерию данных. Создание систем, генерирующих реальную ценность.",
    prof_label: "Опыт работы",

    prof_job1_title: "Разработчик моделей и алгоритмов",
    prof_job1_company: "Роял Кредит Банк (клиентский проект)",
    prof_job1_period: "2024 — 2025",
    prof_job1_item1: "Разработал и смоделировал алгоритм оптимизации инкассации; анализ исторических данных спрогнозировал увеличение годовой прибыли на 20 млн руб.",
    prof_job1_item2: "Создал систему веб-скрапинга и анализа для извлечения ключевых данных с сайта ЦБ РФ, недоступных через API.",
    prof_job1_item3: "Построил внутреннюю RAG-систему для поддержки бизнес-операций с документо-ориентированным Q&A.",
    prof_job1_stack: "Python · NumPy · Pandas · RAG · Web Scraping",

    prof_job2_title: "Проджект-менеджер / Вайб-кодер",
    prof_job2_company: "ModelGate.ru",
    prof_job2_period: "2025 — настоящее время",
    prof_job2_desc: "API-шлюз и прокси-сервис для LLM. Управление развитием продукта и разработка функциональности с помощью ИИ-ассистированного кодинга.",
    prof_job2_stack: "Python · LLM API · Управление продуктом",

    prof_skills_label: "Технические навыки",
    prof_skill_programming: "Программирование",
    prof_skill_programming_val: "Python (продвинутый) · C++ (средний) · C · Assembler",
    prof_skill_data: "Data / ML",
    prof_skill_data_val: "PyTorch · NumPy · Pandas · PostgreSQL · Matplotlib · Excel",
    prof_skill_nlp: "NLP / LLM",
    prof_skill_nlp_val: "BM25 · Эмбеддинги · RAG · LLM API · Оценка · Prompt Engineering",
    prof_skill_backend: "Backend",
    prof_skill_backend_val: "FastAPI · LangChain · LangGraph",
    prof_skill_systems: "Системы",
    prof_skill_systems_val: "Linux (администрирование домашнего сервера, рабочая станция)",

    prof_contact_label: "Связаться",
    prof_contact_desc: "Интересует сотрудничество или есть проект? Давайте обсудим.",
    prof_download_cv: "Скачать CV",
    prof_email: "Написать письмо",

    // Footer
    footer_copy: "Александр Бородин",
    footer_built: "Создано с любопытством",

    // Common
    view_on_github: "Смотреть на GitHub",
    back_home: "На главную",
    logo_text: "АБ",
  }
};
