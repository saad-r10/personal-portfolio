@AGENTS.md

# Personal Portfolio

Personal portfolio website.

## Core Workflow

1. **No Task, No Work**: Must be working on a branch (`issue-{number}-{slug}`) associated with a GitHub issue. Task is completed when PR is merged (reference with "Closes #N").

> Exception: the initial scaffold commit (this one) was made directly on `main` to bootstrap the repo. All work after that follows the workflow below.

## Pre-Work Checklist (MANDATORY)

**Before ANY code/file changes, verify:**

1. **Issue exists?** → If not, create one first with `gh issue create`
2. **On correct branch?** → Run `git branch --show-current`
   - If on `main`, STOP and create branch: `git checkout -b issue-{N}-{slug}`
   - Branch name MUST match pattern `issue-{number}-{description}`
3. **Branch up to date?** → `git pull origin main` before starting

**Before closing ANY issue:**

1. **PR created?** → Issues are closed via PR merge with "Closes #N", never manually
2. **PR reviewed and merged?** → Wait for human approval

**NEVER:**
- Make file changes while on `main` branch
- Close issues manually (let PR merge close them)
- Skip the PR review cycle

---

## Common Commands

```bash
npm install        # Install dependencies
npm run dev         # Start dev server (http://localhost:3000)
npm run build       # Production build
npm run start        # Serve production build
npm run lint         # Lint
```

---

## Project Structure

```
personal-portfolio/
├── src/
│   ├── app/             # App Router routes, layouts, pages
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── sections/        # Top-level page sections (Hero, Manifesto, Projects, ...)
│   ├── components/      # Shared UI primitives and 3D components
│   └── lib/             # Shared utilities (motion primitives, etc.)
├── public/              # Static assets
└── .github/workflows/   # CI
```

**Tech:** Next.js (App Router) + TypeScript + Tailwind CSS. Deployment target: Netlify.

---

## CI/CD

- **CI:** GitHub Actions runs `npm ci`, `npm run lint`, and `npm run build` on every PR and on push to `main` (`.github/workflows/ci.yml`)
- Branch protection should require CI to pass before merging
- **CD:** Connect the repo to Netlify for automatic deploys on push to `main` (preview deploys on PRs). Build config and the `@netlify/plugin-nextjs` plugin live in `netlify.toml`.

---

## Troubleshooting

| Error | Fix |
|-------|-----|
| Port 3000 in use | `lsof -i :3000` then `kill <PID>`, or `npm run dev -- -p 3001` |
| Stale build artifacts / weird HMR errors | `rm -rf .next` then `npm run dev` |
| Type errors after dependency changes | `rm -rf node_modules package-lock.json && npm install` |
| Missing env var errors | Copy `.env.example` to `.env.local` (gitignored) |
