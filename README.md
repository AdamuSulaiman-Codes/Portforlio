# Adamu Sulaiman Muhammed — portfolio

A single-page portfolio built for job applications: five project case studies,
experience and education, a toolkit overview, and contact details.

Built with React 18, TypeScript and Vite. No UI framework — the styling is one
hand-written stylesheet (`src/index.css`) organised as design tokens first, then
base styles, then components.

## Run it

```sh
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check, then bundle to dist/
npm run preview  # serve the production build
```

## Editing the content

Everything the page renders lives in **`src/data/content.ts`**. You should not
need to touch a component to change wording, add a project, or update a link.

### Adding or editing a project

Each entry in `PROJECTS` takes:

| Field | Meaning |
| --- | --- |
| `index` / `year` | Shown in the project header |
| `kicker` | The one-line summary in larger type |
| `body` | The opening paragraph |
| `details` | Bullet list of what is technically interesting |
| `stack` | Chip labels |
| `metrics` | Three short value/label pairs |
| `links` | Live demo buttons and repository links |
| `media` | Either a screenshot or a code excerpt |
| `flagship` | `true` renders the project in the full-width layout |

A project's `media` is one of:

```ts
// A screenshot from public/work/
{ type: 'image', src: '/work/eventhub.png', alt: '…', width: 1440, height: 1000 }

// A code excerpt, highlighted lightly at render time
{ type: 'code', path: 'simulator.py', lang: 'python', lines: ['def …'] }
```

Projects alternate the side their media sits on automatically. The flagship
project always renders full width.

### Important: the private repositories

Three projects live in **private** GitHub repositories:

- `EventMainBackend` + `EventMain` (EventHub)
- `Peak-Hours`
- `IssuePacket`

A private repository URL returns a 404 to anyone who is not signed in as the
owner, so linking one on a public portfolio shows a recruiter a broken page.
Because of that, private repositories render as a neutral `Private` chip with a
working **Request access** email link instead of a dead GitHub button.

**When you make a repository public, flip one line:**

```ts
// src/data/content.ts
visibility: 'private'   →   visibility: 'public'
```

The real GitHub button then appears automatically.

### Deployment

The theme is applied before first paint by a small inline script in
`index.html`, so there is no flash of the wrong colour scheme. The site is
static — `dist/` can be deployed to Vercel, Netlify or any static host.

## Accessibility and quality notes

- Skip link, semantic landmarks, and a visible `:focus-visible` ring on every
  interactive element.
- All scroll-reveal motion is gated behind `prefers-reduced-motion`, and content
  is visible without JavaScript.
- No horizontal overflow from 320px up.
- Light and dark themes follow the OS setting, with a manual toggle that
  persists to `localStorage`.
