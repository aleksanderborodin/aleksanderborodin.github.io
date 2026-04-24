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
    nav_writing: "Writing",

    // Landing
    landing_greeting: "Hello, I'm",
    landing_name: "Aleksander Borodin",
    landing_role: "Embedded AI Developer – MIPT",
    landing_intro: "MIPT student building embedded AI as part of the curriculum — with side projects in LLM safety, multi-agent systems, and other things that catch my attention.",
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
    sci_hero_title: "LLM Safety Research & NLP",
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
    prof_hero_title: "ML Engineering & AI Development",
    prof_hero_desc: "Delivering measurable business impact through AI, optimization, and data engineering. Building systems that generate real value.",
    prof_label: "Experience",

    prof_job1_title: "Model & Algorithm Developer",
    prof_job1_company: "Retail Bank (Client Project)",
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
    footer_built: "Built with curiosity and Claude Code",

    // Common
    view_on_github: "View on GitHub",
    back_home: "Back to Home",
    read_more: "Read more",
    related_work: "Related work",
    logo_text: "AB",

    // Project: Idea Evolve
    ie_title: "Idea Evolve",
    ie_subtitle: "Evolutionary multi-agent framework",
    ie_tagline: "Autonomous framework where specialized Claude agents work in parallel across generations and build a shared knowledge base that gets smarter every generation — no human in the loop.",

    ie_section_result: "Headline result",
    ie_result_heading: "Sidon set: 66 → 105 in 7 autonomous generations",
    ie_result_unit: "elements · +59% vs. baseline",
    ie_result_body: "<strong>Problem:</strong> find the largest B<sub>2</sub> sequence (Sidon set) in <code>{0..10000}</code>.<br><strong>Greedy baseline:</strong> 66 elements.<br><strong>After 7 generations of autonomous agent work:</strong> 105 elements — past the classical √N ≈ 100 reference.",
    ie_result_caption: "Dashboard Overview tab — score progression, generation timeline, and key metrics across a run.",

    ie_section_problem: "Problem",
    ie_problem_heading: "Why single-agent LLM prompting stalls on hard problems",
    ie_problem_text: "Hard optimization problems resist single-shot LLM prompting. A single agent gets stuck in a local optimum, repeats the same ideas, and stops improving. The solution space is too large for one perspective to cover.",
    ie_problem_text_2: "Best-of-N sampling from one model helps a little, but the samples are drawn from the same distribution — you get variance, not diversity. The failure mode is recognisable: after a few tries the model cycles through the same three approaches, never finding the fourth.",

    ie_section_approach: "Approach",
    ie_approach_heading: "Role-specialized agents plus a shared, growing knowledge base",
    ie_approach_text: "Idea Evolve runs 3–8 specialized agents in parallel inside each generation. Each agent writes candidate solutions and iterates on them for 40+ cycles. The best survive, get combined, and seed the next generation — a classic evolutionary loop, except the variation is produced by agents with different roles instead of random mutation.",
    ie_approach_text_2: "What makes it compound is a <strong>shared knowledge base</strong>: after every generation an Evaluator extracts ideas, patterns, and facts into a growing hierarchy (State of Affairs → Clusters → Ideas/Patterns/Facts). The next generation's agents read that knowledge before writing anything, so lessons transfer across runs — the system literally gets smarter each generation.",

    ie_section_pipeline: "Pipeline",
    ie_pipeline_heading: "Six phases per generation",
    ie_pipeline_text: "A stateless orchestrator runs every generation through the same six phases. All state lives in files — if the orchestrator crashes, restart the same command and it resumes exactly where it left off, skipping completed agents and killing orphans.",
    ie_phase1_name: "Architect",
    ie_phase1_desc: "Plans the generation's strategy and assigns specialized agents.",
    ie_phase2_name: "Agent work",
    ie_phase2_desc: "3–8 agents work in parallel — writing solutions, evaluating them, iterating 40+ cycles each.",
    ie_phase3_name: "Evaluator",
    ie_phase3_desc: "Scores every candidate and extracts knowledge (ideas, patterns, facts) into the shared base.",
    ie_phase4_name: "System critic",
    ie_phase4_desc: "Diagnoses pipeline issues and recommends improvements for the next generation.",
    ie_phase5_name: "Consistency",
    ie_phase5_desc: "Audits the knowledge base so contradictions and duplicates don't compound.",
    ie_phase6_name: "Finalize",
    ie_phase6_desc: "Updates rankings, scores, and detects any manual interventions before handing off.",
    ie_pipeline_caption: "Pipeline tab — per-agent status (waiting / running / done / failed) and the data flow between phases in one generation.",

    ie_section_agents: "Agent types",
    ie_agents_heading: "Six specialized roles, one evolving population",
    ie_agents_text: "Each role contributes a different kind of variation. The orchestrator mixes them every generation so the population keeps genuine diversity — the thing vanilla best-of-N can't deliver.",
    ie_agent_explore_title: "Explore",
    ie_agent_explore_desc: "Novel approaches — structurally different from existing solutions.",
    ie_agent_exploit_title: "Exploit",
    ie_agent_exploit_desc: "Refine top solutions with targeted, local improvements.",
    ie_agent_genetic_title: "Genetic",
    ie_agent_genetic_desc: "Crossover — combine strengths from two parent solutions.",
    ie_agent_full_title: "Full",
    ie_agent_full_desc: "Full autonomy — read everything, try anything.",
    ie_agent_research_title: "Research",
    ie_agent_research_desc: "Mathematical research — read papers, derive new approaches.",
    ie_agent_experimentator_title: "Experimentator",
    ie_agent_experimentator_desc: "Builds shared helper utilities that every other agent can call.",

    ie_section_dashboard: "Dashboard",
    ie_dashboard_heading: "Inspect any run live, straight from the filesystem",
    ie_dashboard_text: "A Flask app reads directly from each run's directory — no database, no ingest job. It auto-detects every problem and attempt and renders six tabs: Overview, Pipeline, Architecture, Solutions, Knowledge, and Reports.",
    ie_gallery_architecture: "Architecture — run directory layout, knowledge hierarchy, idea lifecycle.",
    ie_gallery_solutions: "Solutions — every evaluated candidate, sortable, color-coded by validity.",
    ie_gallery_knowledge: "Knowledge — three-layer hierarchy: State of Affairs → Clusters → Ideas / Patterns / Facts.",
    ie_gallery_reports: "Reports — agent debrief notes and system feedback by generation.",

    ie_section_harness: "Harnesses",
    ie_harness_heading: "Route any agent through any provider",
    ie_harness_text: "Every agent session launches through a harness adapter. <strong>claude-code</strong> is the default; <strong>opencode</strong> is a second adapter that forwards to any provider OpenCode supports — Anthropic, OpenAI, Gemini, local models, or routed through a gateway like ModelGate. Both adapters expose the same contract, so timeout recovery and debrief work identically.",
    ie_harness_text_2: "Override is per-role in a single YAML block — keep architects and evaluators on Claude for reasoning fidelity while routing explorers to a cheaper provider, or flip the default and keep only the architect on Claude. No code changes required.",

    ie_section_usage: "Using it on your own problem",
    ie_usage_heading: "Drop a folder in <code>problems/</code> and run the orchestrator",
    ie_usage_text: "A new problem is a directory: <code>description.md</code>, <code>constraints.md</code>, an <code>evaluate.py</code> that scores candidates (results cached by content hash), a <code>validate.py</code> that enforces correctness, a <code>metrics.yaml</code> with fitness direction and target, plus <code>helpers/</code> and <code>initial_programs/</code>. The shipped examples — <code>gemm</code>, <code>permcodes</code>, <code>sidon</code> — are the best starting templates.",

    ie_section_stack: "Stack",
    ie_stack_text: "Python 3.12+ · Claude Code CLI · OpenCode (optional) · Anthropic API · Flask dashboard · filesystem-only state",
  },

  ru: {
    // Nav
    nav_home: "Главная",
    nav_scientist: "Наука",
    nav_contributor: "Open Source",
    nav_professional: "Коммерция",
    nav_writing: "Блог",

    // Landing
    landing_greeting: "Привет, я",
    landing_name: "Александр Бородин",
    landing_role: "Разработчик воплощённого ИИ – МФТИ",
    landing_intro: "Студент МФТИ — разрабатываю системы воплощённого ИИ в рамках учебной программы, а в свободное время занимаюсь LLM, мульти-агентными системами и другим интересным.",
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
    prof_job1_company: "Розничный банк (клиентский проект)",
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
    footer_built: "Создано с любопытством и Claude Code",

    // Common
    view_on_github: "Смотреть на GitHub",
    back_home: "На главную",
    read_more: "Подробнее",
    related_work: "Связанные работы",
    logo_text: "АБ",

    // Project: Idea Evolve
    ie_title: "Idea Evolve",
    ie_subtitle: "Эволюционный мульти-агентный фреймворк",
    ie_tagline: "Автономный фреймворк, где специализированные агенты Claude работают параллельно по поколениям и строят общую базу знаний, которая умнеет с каждым поколением — без человека в цикле.",

    ie_section_result: "Главный результат",
    ie_result_heading: "Множество Сидона: 66 → 105 за 7 автономных поколений",
    ie_result_unit: "элементов · +59% к baseline",
    ie_result_body: "<strong>Задача:</strong> найти наибольшую B<sub>2</sub>-последовательность (множество Сидона) в <code>{0..10000}</code>.<br><strong>Жадный baseline:</strong> 66 элементов.<br><strong>После 7 поколений автономной работы агентов:</strong> 105 элементов — выше классического ориентира √N ≈ 100.",
    ie_result_caption: "Вкладка Overview в дашборде — прогресс скоров, таймлайн поколений и ключевые метрики за прогон.",

    ie_section_problem: "Проблема",
    ie_problem_heading: "Почему одношаговый промптинг пасует на сложных задачах",
    ie_problem_text: "Сложные задачи оптимизации плохо решаются одношаговым промптингом LLM. Один агент застревает в локальном оптимуме, повторяет одни и те же идеи и перестаёт улучшаться. Пространство решений слишком велико для одной точки зрения.",
    ie_problem_text_2: "Best-of-N сэмплинг из одной модели немного помогает, но сэмплы берутся из того же распределения — получаешь разброс, а не разнообразие. Failure mode узнаваем: после нескольких попыток модель крутит те же три подхода, не находя четвёртого.",

    ie_section_approach: "Подход",
    ie_approach_heading: "Ролевая специализация агентов плюс растущая общая база знаний",
    ie_approach_text: "Idea Evolve запускает 3–8 специализированных агентов параллельно внутри каждого поколения. Каждый агент пишет кандидатов и итеративно дорабатывает их в 40+ циклах. Лучшие выживают, комбинируются и становятся seed для следующего поколения — классический эволюционный цикл, но вариацию даёт роль агента, а не случайная мутация.",
    ie_approach_text_2: "Что даёт накопление — <strong>общая база знаний</strong>: после каждого поколения Evaluator вытаскивает идеи, паттерны и факты в растущую иерархию (State of Affairs → Clusters → Ideas / Patterns / Facts). Агенты следующего поколения читают её до того, как что-либо написать, поэтому уроки переносятся между прогонами — система буквально умнеет с каждым поколением.",

    ie_section_pipeline: "Пайплайн",
    ie_pipeline_heading: "Шесть фаз в одном поколении",
    ie_pipeline_text: "Stateless-оркестратор прогоняет каждое поколение через одни и те же шесть фаз. Всё состояние живёт в файлах — если оркестратор упал, перезапуск той же команды продолжит с того места, где остановились, пропуская завершённых агентов и убивая осиротевшие процессы.",
    ie_phase1_name: "Architect",
    ie_phase1_desc: "Планирует стратегию поколения и распределяет задачи между специализированными агентами.",
    ie_phase2_name: "Agent work",
    ie_phase2_desc: "3–8 агентов работают параллельно — пишут решения, оценивают их, итерируют по 40+ циклов.",
    ie_phase3_name: "Evaluator",
    ie_phase3_desc: "Оценивает всех кандидатов и извлекает знания (идеи, паттерны, факты) в общую базу.",
    ie_phase4_name: "System critic",
    ie_phase4_desc: "Диагностирует проблемы пайплайна и предлагает улучшения на следующее поколение.",
    ie_phase5_name: "Consistency",
    ie_phase5_desc: "Аудит базы знаний, чтобы противоречия и дубликаты не накапливались.",
    ie_phase6_name: "Finalize",
    ie_phase6_desc: "Обновляет рейтинги, скоры и фиксирует любые ручные правки перед передачей дальше.",
    ie_pipeline_caption: "Вкладка Pipeline — статус каждого агента (ждёт / работает / готов / упал) и поток данных между фазами одного поколения.",

    ie_section_agents: "Типы агентов",
    ie_agents_heading: "Шесть специализированных ролей, одна эволюционирующая популяция",
    ie_agents_text: "Каждая роль вносит свой тип вариации. Оркестратор смешивает их каждое поколение, поэтому популяция сохраняет настоящее разнообразие — то, чего обычный best-of-N дать не может.",
    ie_agent_explore_title: "Explore",
    ie_agent_explore_desc: "Новые подходы — структурно отличные от существующих решений.",
    ie_agent_exploit_title: "Exploit",
    ie_agent_exploit_desc: "Дорабатывает топовые решения точечными локальными улучшениями.",
    ie_agent_genetic_title: "Genetic",
    ie_agent_genetic_desc: "Кроссовер — совмещает сильные стороны двух родительских решений.",
    ie_agent_full_title: "Full",
    ie_agent_full_desc: "Полная автономия — читает всё, пробует что угодно.",
    ie_agent_research_title: "Research",
    ie_agent_research_desc: "Математическое исследование — читает статьи, выводит новые подходы.",
    ie_agent_experimentator_title: "Experimentator",
    ie_agent_experimentator_desc: "Строит общие вспомогательные утилиты, которыми пользуются все остальные агенты.",

    ie_section_dashboard: "Дашборд",
    ie_dashboard_heading: "Смотрите любой прогон вживую прямо из файловой системы",
    ie_dashboard_text: "Flask-приложение читает напрямую из директории прогона — ни базы данных, ни ingest-джобы. Оно автоматически находит все задачи и попытки и рендерит шесть вкладок: Overview, Pipeline, Architecture, Solutions, Knowledge и Reports.",
    ie_gallery_architecture: "Architecture — раскладка директории прогона, иерархия знаний, жизненный цикл идеи.",
    ie_gallery_solutions: "Solutions — каждое оценённое решение, сортируемое, с цветовой маркировкой по валидности.",
    ie_gallery_knowledge: "Knowledge — трёхуровневая иерархия: State of Affairs → Clusters → Ideas / Patterns / Facts.",
    ie_gallery_reports: "Reports — дебрифы агентов и системная обратная связь по поколениям.",

    ie_section_harness: "Харнессы",
    ie_harness_heading: "Направляйте любого агента через любого провайдера",
    ie_harness_text: "Каждая сессия агента запускается через адаптер-харнесс. <strong>claude-code</strong> — дефолтный; <strong>opencode</strong> — второй адаптер, маршрутизирующий на любой провайдер, который поддерживает OpenCode: Anthropic, OpenAI, Gemini, локальные модели или через шлюз типа ModelGate. Оба адаптера реализуют один и тот же контракт, поэтому восстановление после таймаута и дебриф работают одинаково.",
    ie_harness_text_2: "Переопределение — поролевое, в одном YAML-блоке: можно держать архитекторов и оценщиков на Claude ради качества рассуждений, а explorer'ов отправлять на провайдера подешевле, или перевернуть дефолт и оставить только архитектора на Claude. Код править не нужно.",

    ie_section_usage: "Применение к своей задаче",
    ie_usage_heading: "Положите папку в <code>problems/</code> и запустите оркестратор",
    ie_usage_text: "Новая задача — это директория: <code>description.md</code>, <code>constraints.md</code>, <code>evaluate.py</code> для оценки кандидатов (результаты кешируются по хешу содержимого), <code>validate.py</code> для проверки корректности, <code>metrics.yaml</code> с направлением фитнеса и целью, плюс <code>helpers/</code> и <code>initial_programs/</code>. Шаблоны для старта — готовые примеры: <code>gemm</code>, <code>permcodes</code>, <code>sidon</code>.",

    ie_section_stack: "Стек",
    ie_stack_text: "Python 3.12+ · Claude Code CLI · OpenCode (опционально) · Anthropic API · Flask-дашборд · состояние только в файловой системе",
  }
};
