# Session Log — Daily Work Logger

## Session 2 changes

### New: "All Logs" page (`src/pages/Logs/LogsPage.tsx`)
- Lists every saved entry with date, day#, project, title, tags, team info
- Filters: search (title/tech/category/language), date range, project, category, team type, sort order
- Delete entry (with confirm modal)
- Edit entry (full edit modal with all form fields)
- Added to nav as "All Logs" (List icon)

### New: Coding Languages field
- `src/pages/LogEntry/components/LanguagePicker.tsx` — searchable list from schema Languages group, chips for selected
- Added to TaskCard above Technologies
- Saved to Entry as `codingLanguages?: string[]`
- Shown as highlighted tags in Logs page

### New: Team size field
- Input (number) shown in TaskCard when teamType === 'team'
- Saved to Entry as `teamSize?: number`
- Shown in Logs page entry row

### Updated: TechSelector (`src/pages/LogEntry/components/TechSelector.tsx`)
- Groups collapsed by default — not an overwhelming list
- Typing in search auto-expands matching groups
- Tech items are styled buttons (highlighted when selected) instead of plain checkboxes
- Selected count badge on each group header
- "Add to [Group]" button inside each group — adds a new top-level tech with duplicate/similarity check

### Updated: Tech schema (`src/utils/defaultSchema.ts`)
6 new groups added (languages expanded too):
- `ui_frontend` — React, Vue, Angular, Svelte, Astro, Next.js, Tailwind, MUI, Shadcn, Three.js, D3, Vite, Storybook, Framer Motion, GSAP, WebGL, PWA, and more
- `devops` — GitHub Actions, ArgoCD, Flux, Ansible, Terraform, Pulumi, Nginx, Vault, Consul, OpenTelemetry, Datadog, Sentry, Trivy, SonarQube, and more
- `testing` — Jest, Vitest, Cypress, Playwright, Selenium, k6, Postman, Pact, MSW, Stryker, and more
- `ai_ml` — TensorFlow, PyTorch, Hugging Face, LangChain, OpenAI API, Anthropic API, Ollama, scikit-learn, MLflow, Pinecone, Vertex AI, and more
- `mobile` — React Native, Flutter, Expo, Swift/SwiftUI, Kotlin/Jetpack, Ionic, .NET MAUI, KMP, and more
- `security` — OWASP, JWT/OAuth, Penetration Testing, Cryptography, Snyk, HashiCorp Vault, SIEM, WAF, and more

### Updated: Types (`src/utils/types.ts`)
- `Entry` and `TaskFormState`: added `teamSize?: number`, `codingLanguages?: string[]`
- `Preferences`: added `lastCodingLanguages?`, `lastTeamSize?`
- `PageName`: added `'logs'`

### Updated: AppContext (`src/context/AppContext.tsx`)
- Added `updateEntry(entry)` — replaces one entry in-place, persists
- Added `deleteEntry(id)` — removes entry by id, persists

### Updated: CSV export (`src/utils/helpers.ts`)
- Added `codingLanguages` and `teamSize` columns

### Updated: Nav (`src/layouts/PageLayout.tsx`)
- 4 nav items: Log Entry | All Logs | Dashboard | Schema
