---
name: go
description: Full pipeline — fix tests, parallel review, update CLAUDE.md, commit. One command does it all.
argument-hint: [optional focus area]
allowed-tools: Bash, Read, Edit, Write, Glob, Grep, Task, TodoWrite
---

# /go — Fix, Review & Ship

Full pipeline in 1 command. Stops on first critical failure.

## Phase 1 — Fix All Failing Tests

1. Run `npm test` and capture output
2. If all tests pass → skip to Phase 2
3. If tests fail:
   - Read the failing test file to understand what it expects
   - Read the source file under test to find the root cause
   - Fix the **source code**, not the test (unless the test is clearly wrong)
   - Re-run `npm test`
   - Loop until all green (max 5 iterations)

### GATE 1: All tests green?
- YES → proceed to Phase 2
- NO after 5 loops → stop, show remaining failures

## Phase 2 — Parallel Review Team (3 agents)

Launch these 3 tasks simultaneously using the Task tool:

### Agent 1: Test Fixer
- Run the test-fixer agent (`agents/test-fixer.md`)
- Verify all tests still pass after Phase 1 changes
- If any regressions, fix them

### Agent 2: Code Reviewer
- Review all files in `src/` for code quality
- Check for: bugs, logic errors, naming conventions, DRY violations
- Report findings as actionable items

### Agent 3: Security Reviewer
- Scan all files in `src/` for security issues
- Check for: hardcoded secrets, SQL injection, missing input validation, OWASP Top 10
- Report findings as actionable items

**Wait for all 3 agents to complete before proceeding.**

## Phase 3 — Update CLAUDE.md

1. Read the current `CLAUDE.md`
2. Add or update these sections based on what was learned:
   - **API Conventions** — patterns discovered in the codebase
   - **Test Patterns** — how tests are structured
   - **Known Issues** — anything found during review
3. Keep it concise — max 3 bullets per section

## Phase 4 — Create Agent Library

Ensure these agent files exist in `agents/`:

1. `agents/test-fixer.md` — runs tests, fixes failures, loops until green
2. `agents/code-reviewer.md` — bugs, quality, conventions
3. `agents/security-reviewer.md` — OWASP scan, secrets check, access control

Only create agents that don't already exist. Skip if the file is already there.

## Phase 5 — Commit & Summary

1. Stage all changed files (not `node_modules/`)
2. Commit with message: `feat: pipeline run — tests fixed, reviewed, shipped`
3. Show summary:

```
## /go Summary

| Step              | Result |
|-------------------|--------|
| Test fix          | ...    |
| Test fixer agent  | ...    |
| Code review       | ...    |
| Security review   | ...    |
| CLAUDE.md update  | ...    |
| Agent library     | ...    |
| Commit            | ...    |
```

## Rules

- Do NOT ask for confirmation between steps — just run them all
- Fix source code, not tests — unless the test is clearly wrong
- Minimal changes — fix what's broken, don't refactor unrelated code
- Phase 2 agents run in PARALLEL — don't wait for one before starting the next
- Never commit `node_modules/`, `.env`, or secrets
- Max 5 test-fix loops, max 2 retry loops for other phases
