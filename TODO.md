# Daily Work Logger — TODO & Improvements

## Hosting & Deployment

- [ ] **GitHub Pages setup** — Push workflow, enable Pages in repo settings (Settings > Pages > Source: GitHub Actions), add Firebase secrets to repo secrets (Settings > Secrets > Actions):
  - `VITE_FIREBASE_API_KEY`
  - `VITE_FIREBASE_AUTH_DOMAIN`
  - `VITE_FIREBASE_PROJECT_ID`
  - `VITE_FIREBASE_STORAGE_BUCKET`
  - `VITE_FIREBASE_MESSAGING_SENDER_ID`
  - `VITE_FIREBASE_APP_ID`
- [ ] **Custom domain** (optional) — Add CNAME file in `public/` and configure in repo settings
- [ ] **Firestore rules** — Currently open (`allow read, write: if true`). Acceptable for personal tool but consider adding basic auth if sharing the URL

---

## Duplicate Prevention (Current Status)

### Done
- [x] Auto-capitalize first letter on new projects, categories, sub-techs
- [x] Case-insensitive exact duplicate blocking
- [x] Levenshtein distance similarity detection (distance <= 2)
- [x] Substring containment detection ("React" vs "ReactJS")
- [x] Confirmation modal on similar match — choose existing or create anyway
- [x] Applied to: CategoryPicker, ProjectSelector, TechSelector (sub-techs), SchemaManagerPage (all 4 add flows)

### Still Needed
- [ ] **Technology name similarity** in TechSelector — currently only sub-techs are checked; the main tech checkboxes come from schema so no user input, but SchemaManager `addTech` does check now
- [ ] **Cross-field duplicate check** — e.g. user adds "PostgreSQL" as a category when it already exists as a technology (low priority, edge case)
- [ ] **Bulk input validation** — if importing JSON schema, validate for duplicates before merging

---

## Features & Improvements

### High Priority
- [ ] **Edit existing entries** — click an entry in Dashboard history to edit/update it
- [ ] **Delete entries** — swipe or button to remove an entry (with confirmation)
- [ ] **Offline mode indicator** — show a banner when Firebase is unreachable, entries save to localStorage
- [ ] **Entry search** — search/filter entries by title, description text in Dashboard
- [ ] **Date picker for past entries** — allow logging work for previous days (not just today)

### Medium Priority
- [ ] **Drag & drop task reorder** — reorder tasks within the log form
- [ ] **Task templates** — save common task setups (title + categories + tech) for quick reuse
- [ ] **Weekly summary view** — aggregate view showing what was done each week
- [ ] **Tag system** — lightweight tags in addition to categories for more flexible filtering
- [ ] **Entry duplication** — duplicate a previous entry as starting point for today
- [ ] **Multi-project per day** — currently one project per submission; allow switching projects within same day log
- [ ] **Description formatting** — Markdown support or at least bullet points in description field
- [ ] **Import schema JSON** — upload a previously exported schema to restore/merge

### Low Priority / Nice to Have
- [ ] **PWA support** — add manifest.json + service worker for installable app
- [ ] **Keyboard shortcuts** — Ctrl+Enter to submit, Ctrl+N for new task, etc.
- [ ] **Dark/light theme toggle** — currently dark only; add a theme switcher
- [ ] **Data backup reminder** — periodic toast suggesting export
- [ ] **Undo last action** — undo last submission or deletion
- [ ] **Entry attachments** — link to PR/commit/doc per task (just URL field)
- [ ] **Time tracking** — optional hours/duration per task
- [ ] **Streak counter** — show consecutive days logged on dashboard
- [ ] **Code splitting** — lazy load Dashboard and SchemaManager pages to reduce bundle size (currently 1MB)

---

## UI / UX Polish
- [ ] **Loading skeletons** — skeleton components exist in `src/ui/Skeleton.tsx` but aren't wired into pages yet
- [ ] **Empty state for Schema page** — show message when a section has no items
- [ ] **Form validation improvements** — highlight all empty required fields, not just title
- [ ] **Scroll to error** — auto-scroll to the first task card with an error on submit
- [ ] **Animation polish** — use framer-motion for page transitions, card add/remove
- [ ] **Toast auto-dismiss** — toasts should auto-dismiss after a few seconds (check if implemented)
- [ ] **Mobile bottom nav active state** — ensure active page is visually highlighted
- [ ] **Responsive charts** — verify recharts renders well on small screens
- [ ] **Favicon** — add a proper favicon (currently 404ing)

---

## Technical Debt
- [ ] **Bundle size** — 1MB chunk; split Firebase, Recharts, and page code into separate chunks
- [ ] **Package name** — still `temp-init` in package.json, rename to `daily-work-logger`
- [ ] **ESLint config** — verify linting rules are set up and passing
- [ ] **Tests** — add basic tests for helpers, hooks, and key user flows
- [ ] **Error boundaries** — wrap pages in React error boundaries
- [ ] **Firestore data migration** — if schema shape changes, handle migration of existing data
- [ ] **Type-safe Firestore** — add Firestore converters for type safety on reads/writes
