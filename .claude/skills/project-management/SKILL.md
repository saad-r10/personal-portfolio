---
name: project-management
description: GitHub project management for the personal portfolio. Covers issue creation, branch workflows, PR management, and the "no task, no work" principle. Use when discussing tasks, creating issues, or managing the development workflow.
---

# Portfolio Project Management

GitHub-based project management following the "no task, no work" principle.

## Core Principles

1. **No Task, No Work**: Every piece of work must have a GitHub issue before starting
2. **Branch per Issue**: Branch names follow `issue-{N}-{slug}` pattern
3. **PR-Based Closure**: Issues are closed via PR merge with "Closes #N"

## Workflow

### 1. Create Issue

```bash
# Create a new issue
gh issue create --title "Add projects section" --body "Description..."

# Or with labels
gh issue create \
  --title "Add projects section" \
  --body "Description..." \
  --label "feature"
```

### 2. Create Branch

```bash
# Get issue number from creation output, then:
git checkout -b issue-{N}-{slug}

# Example:
git checkout -b issue-7-add-projects-section
```

### 3. Make Changes

```bash
# Stage changes
git add .

# Commit with conventional commit format
git commit -m "feat: add projects section

- Added Projects component
- Wired up project data
- Styled with Tailwind grid"
```

### 4. Push and Create PR

```bash
# Push branch
git push -u origin issue-7-add-projects-section

# Create PR
gh pr create \
  --title "feat: add projects section" \
  --body "## Summary
- Added projects section to homepage

## Test plan
- [ ] Section renders on homepage
- [ ] Responsive on mobile

Closes #7"
```

### 5. Review and Merge

```bash
# View PR status
gh pr status

# Merge PR (closes the issue)
gh pr merge --squash
```

## Issue Labels

| Label | Purpose |
|-------|---------|
| `bug` | Something isn't working |
| `enhancement` | Improvement to existing feature |
| `feature` | New functionality |
| `content` | Copy, resume data, project descriptions |
| `design` | Styling, layout, visual changes |
| `chore` | Tooling, deps, CI, maintenance |

## Branch Naming

Pattern: `issue-{number}-{slug}`

Examples:
- `issue-3-dark-mode-toggle`
- `issue-7-add-projects-section`
- `issue-12-fix-mobile-nav`

## Commit Messages

Use conventional commits:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `refactor:` - Code refactoring
- `style:` - Styling/CSS only
- `chore:` - Maintenance

Examples:
```
feat: add projects section
fix: resolve mobile nav overlap
docs: update CLAUDE.md with deploy steps
refactor: extract Card component
style: adjust hero spacing
chore: update dependencies
```

## PR Template

```markdown
## Summary
[Brief description of changes]

## Changes
- [Change 1]
- [Change 2]

## Test Plan
- [ ] Test case 1
- [ ] Test case 2

## Screenshots (if UI changes)
[Add screenshots]

Closes #N
```

## GitHub CLI Commands

```bash
# Issues
gh issue list                    # List open issues
gh issue view 7                  # View issue #7
gh issue create                  # Create issue interactively
gh issue close 7                 # Close issue (prefer PR merge)

# Pull Requests
gh pr list                        # List open PRs
gh pr view                        # View current branch PR
gh pr create                      # Create PR interactively
gh pr merge --squash               # Squash merge PR
gh pr checks                      # View CI status

# Branches
gh pr checkout 42                 # Checkout PR #42's branch

# Workflow
gh run list                       # List recent workflow runs
gh run view                        # View latest run
```

## Pre-Work Checklist

Before making any changes:

1. [ ] Issue exists for the work
2. [ ] On correct branch (`git branch --show-current`)
3. [ ] Branch up to date (`git pull origin main`)
4. [ ] Not on `main` branch

## NEVER

- Make changes on `main` branch
- Close issues manually
- Skip PR review
- Push directly to `main`
- Create commits without an associated issue
