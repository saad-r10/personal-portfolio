---
name: dev-setup
description: Start the personal portfolio development environment. Starts the Next.js dev server. Use when user wants to start developing or run the app locally.
---

# Portfolio Development Setup

Start and manage the local development environment.

## Architecture

| Component | Runs In | URL |
|-----------|---------|-----|
| Next.js dev server | Local (Node) | http://localhost:3000 |

## Prerequisites Check

```bash
node --version   # Node 18.18+ (Next.js requirement)
npm --version
```

If Node is missing, install via [nodejs.org](https://nodejs.org) or `brew install node`.

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Start dev server

```bash
npm run dev
```

App runs at http://localhost:3000 with hot reload.

### 3. Lint

```bash
npm run lint
```

### 4. Production build (verify before PR)

```bash
npm run build
npm run start   # serves the production build at http://localhost:3000
```

## Environment Variables

If the project needs env vars (e.g. for a contact form or analytics), copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

`.env.local` is gitignored and never committed.

## Verification

```bash
# Dev server responds
curl -I http://localhost:3000

# Lint and build pass
npm run lint && npm run build
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 3000 in use | `lsof -i :3000` then `kill <PID>`, or run `npm run dev -- -p 3001` |
| Stale `.next` build artifacts causing weird errors | `rm -rf .next` then `npm run dev` |
| Type errors after pulling new deps | `rm -rf node_modules package-lock.json && npm install` |
| Missing env var errors | Copy `.env.example` to `.env.local` |
