/**
 * All portfolio copy lives here. Editing this file is the only thing you need
 * to do to keep the site current.
 *
 * ── GitHub visibility ────────────────────────────────────────────────────────
 * Three projects are built in private repositories. A private repo URL returns
 * a 404 to anyone who isn't signed in as you, so linking one on a portfolio
 * shows a recruiter a broken page. Instead, private repos render as a neutral
 * "Private repository" chip with a working "request access" mail link.
 *
 * When you flip one of these repos to public on GitHub, change its
 * `visibility: 'private'` to `visibility: 'public'` below and the GitHub button
 * appears automatically.
 */

export interface RepoRef {
  name: string
  url: string
  visibility: 'public' | 'private'
}

export type ProjectLink =
  | { kind: 'live'; label: string; href: string }
  | { kind: 'repo'; label: string; repo: RepoRef }

export type ProjectMedia =
  | { type: 'image'; src: string; alt: string; width: number; height: number }
  | { type: 'code'; path: string; lang: string; lines: string[] }

export interface Project {
  id: string
  index: string
  name: string
  year: string
  role: string
  kicker: string
  body: string
  details: string[]
  stack: string[]
  metrics: { value: string; label: string }[]
  links: ProjectLink[]
  media: ProjectMedia
  flagship?: boolean
}

/* ── Profile ─────────────────────────────────────────────────────────────── */

export const PROFILE = {
  name: 'Adamu Sulaiman Muhammed',
  shortName: 'Adamu Sulaiman',
  initials: 'AS',
  role: 'Full-stack software engineer',
  location: 'Abuja, Nigeria',
  email: 'adamusulaiman740@gmail.com',
  phone: '+234 816 060 3614',
  github: 'https://github.com/AdamuSulaiman-Codes',
  linkedin:
    'https://www.linkedin.com/in/adamu-sulaiman-muhammed-6142ba255/',
  status: 'Open to 2026 graduate and internship roles',
}

export const HEADLINE = {
  lead: {
    before: 'I build full-stack systems that ',
    em: 'hold up',
    after: ' in production.',
  },
  support:
    'Final-year software engineering student at Skyline University Nigeria. I work across Java and Spring Boot services and the React and TypeScript interfaces that sit on top of them — API security, payment settlement, QR ticketing, and language-model features that earn their place.',
}

export const HERO_FACTS = [
  { label: 'Based in', value: 'Abuja, Nigeria' },
  { label: 'Studying', value: 'B.Sc. Software Engineering, 2026' },
  { label: 'Focus', value: 'Backend · Full-stack · Applied AI' },
  { label: 'Languages', value: 'English, Hausa' },
]

/* ── About ───────────────────────────────────────────────────────────────── */

export const ABOUT: string[] = [
  'I am in my final year of a Software Engineering degree at Skyline University Nigeria, graduating in 2026. Most of what I know came from building software that had to actually work for someone, not from following a tutorial to the end.',
  'My work sits mostly on the backend: Java 21 and Spring Boot services, PostgreSQL schemas kept under Flyway migrations, JWT and OAuth security, and payment flows where being approximately right is the same as being wrong. I also build the interfaces those services run behind, and I care about how they feel as much as whether they compile.',
  'Outside coursework I build tools for myself and finish them — an event platform with real payment settlement, a Telegram bot that classifies my day with a language model, and an offline focus timer for Android. The habit that has stuck is writing things down: migrations, API contracts, and the reasoning behind decisions, so the next person does not have to guess.',
]

export const CURRENTLY = {
  title: 'Right now',
  items: [
    'Working through data structures, algorithms and system design.',
    'Writing more Python, mostly for data and modelling work.',
    'Open to graduate and internship roles starting in 2026.',
  ],
}

/* ── Projects ────────────────────────────────────────────────────────────── */

export const PROJECTS: Project[] = [
  {
    id: 'eventhub',
    index: '01',
    name: 'EventHub',
    year: '2026',
    role: 'Final-year research project · Solo full-stack build',
    kicker:
      'An invite-controlled event platform with real payment settlement, QR ticketing and AI feedback analysis.',
    body: 'Nigerian organisers run paid events through WhatsApp threads, spreadsheets and manual bank transfers. EventHub puts the whole flow in one system: publish an event, invite attendees, collect payment, issue a QR ticket, and scan people in at the door.',
    details: [
      'JWT access tokens with rotating refresh tokens, plus Google OAuth sign-in, behind role-based access control across organiser, collaborator and attendee views.',
      'Payments settle to the organiser’s own Paystack subaccount, verified by HMAC-SHA512 webhook signature and reconciled against the event ledger rather than trusted on the client.',
      'QR tickets generated with ZXing and stored on Cloudinary, validated by a live check-in scanner that rejects reused tickets.',
      'Attendee feedback is scored for sentiment by a Groq-hosted LLaMA model; tickets, invitations and receipts are delivered over Gmail SMTP.',
      'The PostgreSQL schema is managed entirely by Flyway migrations with ddl-auto set to validate, so environments cannot drift apart.',
    ],
    stack: [
      'Java 21',
      'Spring Boot 3.5',
      'PostgreSQL',
      'Flyway',
      'Spring Security',
      'JWT + OAuth',
      'React 18',
      'TypeScript',
      'Paystack',
      'ZXing',
      'Cloudinary',
      'Groq / LLaMA',
      'Docker',
    ],
    metrics: [
      { value: '15', label: 'REST controllers' },
      { value: '22', label: 'Flyway migrations' },
      { value: '149', label: 'Java source files' },
    ],
    links: [
      {
        kind: 'live',
        label: 'Live demo',
        href: 'https://event-main-eight.vercel.app',
      },
      {
        kind: 'repo',
        label: 'GitHub · Backend',
        repo: {
          name: 'EventMainBackend',
          url: 'https://github.com/AdamuSulaiman-Codes/EventMainBackend',
          visibility: 'private',
        },
      },
      {
        kind: 'repo',
        label: 'GitHub · Frontend',
        repo: {
          name: 'EventMain',
          url: 'https://github.com/AdamuSulaiman-Codes/EventMain',
          visibility: 'private',
        },
      },
    ],
    media: {
      type: 'image',
      src: '/work/eventhub.png',
      alt: 'The EventHub sign-in screen, showing the product name beside the line: organise events, manage guests, and get paid, all in one place.',
      width: 1440,
      height: 1000,
    },
    flagship: true,
  },
  {
    id: 'peak-hours',
    index: '02',
    name: 'Peak Hours',
    year: '2025 — 2026',
    role: 'Independent product · React Native / Expo',
    kicker:
      'An offline-first focus timer built around a countdown that survives the app being force-quit.',
    body: 'Most focus timers quietly lose time when the phone locks or the app is killed. Peak Hours derives its countdown from a persisted end timestamp instead of a running interval, so a session stays accurate through backgrounding, locking and force-quit, and is reconciled the moment the app reopens.',
    details: [
      'A 60fps eased countdown ring with springy numeral ticks and a breathing cue through the final ten seconds.',
      'An Android home-screen widget that shows today’s focus minutes and any running session, refreshed on every session change.',
      'Reports by project for today, this week and all time, with goal tracking and streaks that keep history after a project is archived.',
      'Local notifications plus an optional daily reminder. No accounts, no backend, and nothing leaves the device.',
    ],
    stack: [
      'React Native',
      'Expo SDK 57',
      'TypeScript',
      'Reanimated',
      'React Native SVG',
      'AsyncStorage',
      'expo-notifications',
      'expo-audio',
      'expo-haptics',
      'Android Widgets',
    ],
    metrics: [
      { value: '13', label: 'app screens' },
      { value: '58', label: 'components' },
      { value: '23', label: 'test files' },
    ],
    links: [
      { kind: 'live', label: 'peakhours.online', href: 'https://peakhours.online' },
      {
        kind: 'repo',
        label: 'GitHub',
        repo: {
          name: 'Peak-Hours',
          url: 'https://github.com/AdamuSulaiman-Codes/Peak-Hours',
          visibility: 'private',
        },
      },
    ],
    media: {
      type: 'image',
      src: '/work/peakhours.png',
      alt: 'The Peak Hours landing page: a headline reading “Meet Ghost. It’s you, yesterday.” beside a lavender ghost character and a waitlist sign-up form.',
      width: 1440,
      height: 1000,
    },
  },
  {
    id: 'issuepacket',
    index: '03',
    name: 'IssuePacket',
    year: '2025',
    role: 'Independent tool · TypeScript monorepo',
    kicker:
      'A local web app and Chrome extension that turn a broken page into a developer-ready bug report.',
    body: 'A useful bug report means reproducing the problem, then describing it well enough that someone else can act on it. IssuePacket records the steps as they happen in the browser, attaches only the diagnostics that matter, and packages the result into a handoff a developer can work from.',
    details: [
      'Extension capture with explicit controls and opt-in diagnostics and screenshots — nothing is recorded until it is asked for.',
      'Text redaction and evidence removal before a report is exported, so secrets do not travel with the bug.',
      'Exports to JSON, Markdown or a portable ZIP, alongside a copyable investigation prompt for an AI assistant.',
      'Runs entirely on IndexedDB with enforced library limits. No backend, no accounts, no uploads.',
    ],
    stack: [
      'TypeScript',
      'React',
      'Vite',
      'Chrome MV3',
      'IndexedDB',
      'Node 22',
      'GitHub Actions',
    ],
    metrics: [
      { value: '7', label: 'shipped MVP batches' },
      { value: '21', label: 'test files' },
      { value: '0', label: 'bytes sent to a server' },
    ],
    links: [
      {
        kind: 'repo',
        label: 'GitHub',
        repo: {
          name: 'IssuePacket',
          url: 'https://github.com/AdamuSulaiman-Codes/IssuePacket',
          visibility: 'private',
        },
      },
    ],
    media: {
      type: 'code',
      path: 'apps/extension/src/capture-model.ts',
      lang: 'typescript',
      lines: [
        'export function appendEvent(',
        '  session: CaptureSession,',
        "  category: CaptureEvent['category'],",
        '  summary: string,',
        '): boolean {',
        '  if (session.events.length >= CAPTURE_LIMITS.events)',
        '    return false;',
        '',
        '  session.events.push({',
        '    id: crypto.randomUUID(),',
        '    elapsedMs: Date.now() - Date.parse(session.startedAt),',
        '    category,',
        '    summary: sanitizeText(summary, 2000),',
        '    url: sanitizeUrl(url),',
        "    origin: 'observed',",
        '  });',
        '  return true;',
        '}',
      ],
    },
  },
  {
    id: 'lifelog',
    index: '04',
    name: 'LifeLog',
    year: '2025',
    role: 'Personal system · Spring Boot + React',
    kicker:
      'A Telegram bot that sorts your day into four domains and keeps the streaks for you.',
    body: 'Send the bot a message about your day. A language model decides whether it is a journal entry, a job application, a note or a practice problem, and asks you to confirm before anything is stored — so the classification is a suggestion, not a verdict.',
    details: [
      'Groq-backed classification with calibrated confidence: ambiguous messages are surfaced for a decision rather than silently filed.',
      'Job tracking that watches the inbox and moves applications through applied, interview, offer and rejected, with an undo on every change.',
      'Spaced repetition on a 1, 3, 7, 14, 30 and 60-day schedule for coding problems, plus a journal streak with a single grace day.',
      'A React dashboard over a small REST API, with the whole system deployed to Google Cloud Run.',
    ],
    stack: [
      'Java',
      'Spring Boot',
      'PostgreSQL',
      'Telegram Bot API',
      'Groq / LLaMA',
      'Gmail API',
      'React',
      'TypeScript',
      'Google Cloud Run',
    ],
    metrics: [
      { value: '4', label: 'classification domains' },
      { value: '6', label: 'review intervals' },
      { value: '2h', label: 'inbox poll interval' },
    ],
    links: [
      {
        kind: 'repo',
        label: 'GitHub · Backend',
        repo: {
          name: 'LifeLog',
          url: 'https://github.com/AdamuSulaiman-Codes/LifeLog',
          visibility: 'public',
        },
      },
      {
        kind: 'repo',
        label: 'GitHub · Frontend',
        repo: {
          name: 'LifeLogFrontend',
          url: 'https://github.com/AdamuSulaiman-Codes/LifeLogFrontend',
          visibility: 'public',
        },
      },
    ],
    media: {
      type: 'code',
      path: 'src/main/java/…/service/ClassificationService.java',
      lang: 'java',
      lines: [
        'private static final String SYSTEM_PROMPT = """',
        '  You classify messages for a personal logging system',
        '  with exactly four domains.',
        '',
        '  - "journal": genuine personal reflection — an emotional',
        '    reaction, or narrating something that happened WITH',
        '    personal commentary attached.',
        '',
        '  - "job": ONLY tracking a job APPLICATION or interview',
        '    process — company, role, and status.',
        '',
        '  - "note": reminders, bookmarks, quotes, bare facts, or',
        '    unclear text. This is the safe default domain.',
        '',
        '  - "practice": the user solved or reviewed a coding or',
        '    interview practice problem.',
        '',
        '  CONFIDENCE CALIBRATION:',
        '  - Gibberish or genuine uncertainty → below 0.5.',
        '  - Only go above 0.8 when the domain is unambiguous.',
        '""";',
      ],
    },
  },
  {
    id: 'predictor',
    index: '05',
    name: 'Premier League Predictor',
    year: '2025',
    role: 'Applied modelling · Python',
    kicker:
      'A Monte Carlo season simulator running on per-match goal models fitted to a decade of results.',
    body: 'The predictor plays out a full season thousands of times over. Each fixture gets goals drawn from two fitted Poisson models, adjusted by an Elo rating carried across matches, and the resulting tables accumulate into a distribution of where each club is likely to finish.',
    details: [
      'Separate Poisson models for home and away goals, with a tuned Elo baseline and rolling form features including shots on target and rest days.',
      'Ten Premier League seasons of raw match data (2016/17 to 2025/26) used for training, with a synthetic bookmaker prior standing in for odds on unplayed fixtures.',
      'Runs thousands of simulated seasons per call and writes finishing-position distributions to a results file.',
      'Exploration notebooks, saved model artifacts and a Streamlit interface for running simulations and reading the output.',
    ],
    stack: [
      'Python',
      'scikit-learn',
      'pandas',
      'NumPy',
      'Poisson models',
      'Elo ratings',
      'Jupyter',
      'Streamlit',
    ],
    metrics: [
      { value: '10', label: 'seasons of data' },
      { value: '1,000+', label: 'seasons per run' },
      { value: '2', label: 'fitted goal models' },
    ],
    links: [
      {
        kind: 'repo',
        label: 'GitHub',
        repo: {
          name: 'pl-predictor',
          url: 'https://github.com/AdamuSulaiman-Codes/pl-predictor',
          visibility: 'public',
        },
      },
    ],
    media: {
      type: 'code',
      path: 'simulator.py',
      lang: 'python',
      lines: [
        'def market_probs(self, home_elo, away_elo):',
        '    """Synthetic bookmaker prior from Elo (no real',
        '    odds for future games)."""',
        '    dr = (home_elo + self.HOME_ADV) - away_elo',
        '    p_home = 1 / (1 + 10 ** (-(dr - self.DRAW_MARGIN) / 400))',
        '    p_away = 1 / (1 + 10 ** ((dr + self.DRAW_MARGIN) / 400))',
        '    p_draw = max(0.0, 1 - p_home - p_away)',
        '    total = p_home + p_draw + p_away',
        '    return p_home / total, p_away / total',
        '',
        '# a single match, then a whole season, then a',
        '# thousand seasons — goals drawn per fixture',
        'gh = max(0, int(rng.poisson(lam_home)))',
        'ga = max(0, int(rng.poisson(lam_away)))',
      ],
    },
  },
]

/* ── Experience & education ──────────────────────────────────────────────── */

export interface TimelineItem {
  period: string
  title: string
  org: string
  location?: string
  points: string[]
  kind: 'work' | 'education'
}

export const TIMELINE: TimelineItem[] = [
  {
    period: '2025',
    title: 'Software Engineering Intern',
    org: 'Flexisaf EduSoft',
    location: 'Abuja, Nigeria',
    kind: 'work',
    points: [
      'Contributed fixes and features to the Schools Distinction application under senior engineers.',
      'Worked inside the team’s React component architecture and internal design system, and learned how production APIs are versioned, documented and integrated.',
      'Reviewed my own work against the standards the rest of the team held, which is where the habit of documenting decisions came from.',
    ],
  },
  {
    period: '2022 — 2026',
    title: 'Undergraduate research & independent builds',
    org: 'Skyline University Nigeria',
    location: 'Kano, Nigeria',
    kind: 'work',
    points: [
      'Designed, built and deployed full-stack systems across Java, Spring Boot, React and TypeScript.',
      'Final-year research: EventHub, a secure event platform with payment settlement, QR ticketing and language-model feedback analysis, supervised by Mr. Alex Aaron.',
      'Built real-time collaborative features with WebSockets and STOMP, and shipped independent products outside coursework.',
    ],
  },
  {
    period: '2022 — 2026',
    title: 'B.Sc. Software Engineering',
    org: 'Skyline University Nigeria',
    location: 'Kano, Nigeria',
    kind: 'education',
    points: [
      'Coursework across algorithms and data structures, databases, software architecture, security and distributed systems.',
      'Final-year project and dissertation: EventHub — an event management platform built end to end.',
    ],
  },
]

/* ── Toolkit ─────────────────────────────────────────────────────────────── */

export interface SkillGroup {
  group: string
  items: string[]
}

export const TOOLKIT: SkillGroup[] = [
  {
    group: 'Languages',
    items: ['Java', 'TypeScript', 'JavaScript', 'Python', 'SQL', 'HTML', 'CSS'],
  },
  {
    group: 'Backend',
    items: [
      'Spring Boot',
      'Spring Security',
      'Spring Data JPA',
      'Hibernate',
      'REST APIs',
      'WebSockets (STOMP)',
      'Flyway',
    ],
  },
  {
    group: 'Frontend',
    items: [
      'React 18',
      'Vite',
      'Tailwind CSS',
      'Redux Toolkit',
      'RTK Query',
      'TanStack Query',
      'React Hook Form',
      'Zod',
      'React Native',
      'Expo',
    ],
  },
  {
    group: 'Data & cloud',
    items: [
      'PostgreSQL',
      'MySQL',
      'Supabase',
      'Docker',
      'Google Cloud Run',
      'Railway',
      'Cloudinary',
    ],
  },
  {
    group: 'AI & modelling',
    items: [
      'Groq / LLaMA',
      'LangChain4j',
      'scikit-learn',
      'pandas',
      'Prompt design',
      'Sentiment analysis',
    ],
  },
  {
    group: 'Security & quality',
    items: [
      'JWT',
      'OAuth 2.0',
      'HMAC-SHA512',
      'BCrypt',
      'Role-based access control',
      'Paystack',
      'JUnit',
      'Mockito',
      'REST-assured',
      'React Testing Library',
    ],
  },
]

/* ── Contact ─────────────────────────────────────────────────────────────── */

export const CONTACT_LEAD =
  'I am looking for graduate and internship roles starting in 2026 — backend, full-stack or platform engineering.'

export const CONTACT_BODY =
  'If you are hiring, or you want to talk through how any of the projects above were built, email is the fastest way to reach me. I answer every message.'

export const NAV_ITEMS = [
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'toolkit', label: 'Toolkit' },
  { id: 'contact', label: 'Contact' },
]
