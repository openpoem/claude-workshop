# Claude Workshop — Demo Project

## About
Simple Express API for user management. Used for Claude Code demo.

## Stack
- Node.js + Express
- Jest + Supertest for testing

## Commands
- `npm test` — run tests
- `npm start` — start server on port 3001

## Structure
- `src/app.js` — Express app with routes
- `src/server.js` — Server entry point
- `tests/users.test.js` — API tests

## API Conventions
- POST returns 201 on successful creation
- DELETE returns 204 with no body
- Missing required fields return 400 with `{ error: "..." }`

## Test Patterns
- Tests use Supertest against the Express app (no server needed)
- Each test is independent; in-memory store persists across tests within a suite
- Tests validate HTTP status codes and response body structure

## Known Issues
- ID generation uses array length — produces duplicates after deletions
- No input sanitization on name/email (stored XSS risk if rendered)
- No rate limiting or request size limits on endpoints
