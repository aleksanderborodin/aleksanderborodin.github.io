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
    sci_hero_title: "LLM Safety Research",
    sci_hero_desc: "Exploring the boundaries of language model safety, knowledge extraction, and applied NLP. Every experiment is a question — every result, a new direction.",
    sci_label: "Research Projects",

    sci_proj1_title: "Prefix Injection Jailbreak",
    sci_proj1_desc: "Researched prefix attacks on LLMs inspired by BBC's Choice Blindness experiments. By simulating the start of a model's response to a forbidden query, models like Gemini 2.5 Pro and DeepSeek R1 were tricked into completing harmful answers — achieving near-100% success on MaliciousInstruct vs. near-zero baseline.",
    sci_proj1_stack: "Python · LLM APIs · Prompt Engineering",

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
    read_more: "Read more",
    related_work: "Related work",
    logo_text: "AB",

    // Project: Prefix Injection Jailbreak
    pij_title: "Prefix Injection Jailbreak",
    pij_subtitle: "LLM safety research",
    pij_tagline: "Near-100% attack success on MaliciousInstruct by simulating the model's own response.",
    pij_stat_value: "~100%",
    pij_stat_label: "Attack success rate on MaliciousInstruct",
    pij_baseline_value: "~0%",
    pij_baseline_label: "Baseline (no attack)",
    pij_section_background: "Background",
    pij_background_text: "The project is inspired by the BBC's Choice Blindness experiments, where participants failed to notice when their own choices were swapped. Translated to LLMs: if a model is shown the start of an answer it supposedly gave to a forbidden query, will it complete that answer as if it were its own?",
    pij_section_method: "Method",
    pij_method_text: "The attacker crafts a conversation where the assistant's prior turn begins with an affirmative prefix — for example, the opening words of a compliant answer to a harmful request. The target model, anchored by the fabricated prefix, continues the completion rather than refusing. No fine-tuning, no gradient access — just prompt construction.",
    pij_section_results: "Results",
    pij_results_text: "Tested against Gemini 2.5 Pro and DeepSeek R1 on the MaliciousInstruct benchmark. Baseline refusal rate is near 100%. With prefix injection applied, attack success reaches near 100% — effectively nullifying the models' safety alignment on this benchmark.",
    pij_section_ethics: "Responsible disclosure",
    pij_ethics_text: "This is defensive security research. The repository documents the attack so that alignment teams can harden against it. Findings are aimed at helping model providers close this failure mode, not at enabling real-world misuse.",
    pij_section_stack: "Stack",
    pij_stack_text: "Python · LLM APIs · Prompt Engineering · MaliciousInstruct benchmark",

    // Project: Idea Evolve
    ie_title: "Idea Evolve",
    ie_subtitle: "Evolutionary multi-agent framework",
    ie_tagline: "Specialized Claude agents evolve solutions to hard optimization problems in parallel.",
    ie_section_problem: "Problem",
    ie_problem_text: "Hard optimization problems resist single-shot LLM prompting. A single agent gets stuck in a local optimum, repeats the same ideas, and stops improving. The solution space is too large for one perspective to cover.",
    ie_section_approach: "Approach",
    ie_approach_text: "Idea Evolve runs a population of specialized agents in parallel, each producing candidate solutions. The best survive, get combined, and get mutated — a classic evolutionary loop, but with each generation's variation produced by agents with different roles instead of random mutation.",
    ie_section_agents: "Agent roles",
    ie_agent_architect_title: "Architects",
    ie_agent_architect_desc: "Propose high-level structure and problem decompositions.",
    ie_agent_explorer_title: "Explorers",
    ie_agent_explorer_desc: "Probe alternative paths — cheap, diverse, willing to fail.",
    ie_agent_researcher_title: "Researchers",
    ie_agent_researcher_desc: "Analyze intermediate results and surface what the rest of the system is missing.",
    ie_section_usage: "How it works",
    ie_usage_text: "A human describes the problem and an evaluation function. Idea Evolve spawns an initial agent work session, records the solutions each role produces, scores them, and feeds the best back as seed context for the next generation. Useful for algorithmic search, prompt optimization, and any task where \"try a lot, keep what works\" is the right move.",
    ie_section_stack: "Stack",
    ie_stack_text: "Python · Claude API · Evolutionary algorithms · Multi-agent orchestration",
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
    sci_hero_title: "Исследования безопасности LLM",
    sci_hero_desc: "Исследование границ безопасности языковых моделей, извлечения знаний и прикладного NLP. Каждый эксперимент — это вопрос, каждый результат — новое направление.",
    sci_label: "Исследовательские проекты",

    sci_proj1_title: "Prefix Injection Jailbreak",
    sci_proj1_desc: "Исследование префиксных атак на LLM, вдохновлённое экспериментами BBC по Choice Blindness. Имитируя начало ответа модели на запрещённый запрос, модели Gemini 2.5 Pro и DeepSeek R1 давали вредоносные ответы — почти 100% успех на MaliciousInstruct против нулевого базового уровня.",
    sci_proj1_stack: "Python · LLM API · Prompt Engineering",

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
    read_more: "Подробнее",
    related_work: "Связанные работы",
    logo_text: "АБ",

    // Project: Prefix Injection Jailbreak
    pij_title: "Prefix Injection Jailbreak",
    pij_subtitle: "Исследование безопасности LLM",
    pij_tagline: "Близкий к 100% успех атаки на MaliciousInstruct за счёт имитации собственного ответа модели.",
    pij_stat_value: "~100%",
    pij_stat_label: "Успех атаки на MaliciousInstruct",
    pij_baseline_value: "~0%",
    pij_baseline_label: "Базовый уровень (без атаки)",
    pij_section_background: "Предыстория",
    pij_background_text: "Проект вдохновлён экспериментами BBC по Choice Blindness, в которых участники не замечали подмены собственных выборов. Переведено на LLM: если показать модели начало ответа, который она якобы дала на запрещённый запрос, продолжит ли она его как свой?",
    pij_section_method: "Метод",
    pij_method_text: "Атакующий формирует диалог, в котором предыдущий ответ ассистента начинается с аффирмативного префикса — например, первых слов согласного ответа на вредоносный запрос. Целевая модель, опираясь на сфабрикованный префикс, продолжает завершение вместо отказа. Без дообучения, без доступа к градиентам — только конструирование промпта.",
    pij_section_results: "Результаты",
    pij_results_text: "Протестировано на Gemini 2.5 Pro и DeepSeek R1 на бенчмарке MaliciousInstruct. Базовый уровень отказа — почти 100%. С применением префиксной инъекции успех атаки приближается к 100% — что фактически нейтрализует safety-выравнивание моделей на этом бенчмарке.",
    pij_section_ethics: "Ответственное раскрытие",
    pij_ethics_text: "Это оборонительное security-исследование. Репозиторий документирует атаку, чтобы команды по выравниванию моделей могли защититься от неё. Выводы направлены на закрытие этого failure mode, а не на enable злоупотреблений.",
    pij_section_stack: "Стек",
    pij_stack_text: "Python · LLM API · Prompt Engineering · бенчмарк MaliciousInstruct",

    // Project: Idea Evolve
    ie_title: "Idea Evolve",
    ie_subtitle: "Эволюционный мульти-агентный фреймворк",
    ie_tagline: "Специализированные агенты Claude параллельно эволюционируют решения сложных задач оптимизации.",
    ie_section_problem: "Проблема",
    ie_problem_text: "Сложные задачи оптимизации плохо решаются одношаговым промптингом LLM. Один агент застревает в локальном оптимуме, повторяет одни и те же идеи и перестаёт улучшаться. Пространство решений слишком велико для одной точки зрения.",
    ie_section_approach: "Подход",
    ie_approach_text: "Idea Evolve запускает популяцию специализированных агентов параллельно, каждый из которых генерирует кандидатов решений. Лучшие выживают, комбинируются и мутируют — классический эволюционный цикл, но вариация в каждом поколении создаётся агентами с разными ролями, а не случайными мутациями.",
    ie_section_agents: "Роли агентов",
    ie_agent_architect_title: "Архитекторы",
    ie_agent_architect_desc: "Предлагают высокоуровневую структуру и декомпозицию задачи.",
    ie_agent_explorer_title: "Исследователи путей",
    ie_agent_explorer_desc: "Пробуют альтернативные пути — дёшево, разнообразно, с правом на неудачу.",
    ie_agent_researcher_title: "Аналитики",
    ie_agent_researcher_desc: "Анализируют промежуточные результаты и подсвечивают, что упустила остальная система.",
    ie_section_usage: "Как это работает",
    ie_usage_text: "Человек описывает задачу и функцию оценки. Idea Evolve запускает начальную рабочую сессию агентов, фиксирует решения каждой роли, оценивает их и возвращает лучшие в качестве seed-контекста следующего поколения. Полезно для алгоритмического поиска, оптимизации промптов и любых задач, где уместен подход «попробуй много — оставь то, что работает».",
    ie_section_stack: "Стек",
    ie_stack_text: "Python · Claude API · Эволюционные алгоритмы · Мульти-агентная оркестрация",
  }
};
