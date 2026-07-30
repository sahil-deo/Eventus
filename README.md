# Eventus

Eventus is a small event-management service for storing and viewing service logs and errors. It provides a REST API built with Express, PostgreSQL persistence through Prisma, and a lightweight browser dashboard.

## Features

- Create, list, update, and delete events
- Event types: `log` and `error`
- Cursor-based event pagination, returning up to five events per request
- Health and event-count endpoints
- Input validation with Zod
- Static dashboard for browsing and managing events

## Requirements

- Node.js 18+
- PostgreSQL
- npm

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root:

   ```env
   # Used by the running application
   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/eventus"

   # Used by Prisma migrations
   DIRECT_URL="postgresql://USER:PASSWORD@localhost:5432/eventus"
   ```

   Use the appropriate connection strings for your PostgreSQL instance. They may be the same value for a local database.

3. Generate the Prisma client and apply the database migrations:

   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

## Running the application

Build and start the API:

```bash
npm run build
npm start
```

The API listens on `http://localhost:8000`.

For development, `npm run run` builds the project and starts the API in one command.

The dashboard is in [`frontend/index.html`](frontend/index.html). Open it in a browser while the API is running. It expects the API at `http://localhost:8000`.

## API

The complete OpenAPI description is available at [`docs/openapi.json`](docs/openapi.json).

### Health and statistics

```http
GET /health
GET /events/util/count
```

### Events

```http
GET    /events
GET    /events/:id
POST   /events
PUT    /events/:id
DELETE /events/:id
```

`GET /events` returns up to five events ordered from newest to oldest. Pass the returned `nextId` as a query parameter to request the next page:

```http
GET /events?nextId=<event-uuid>
```

Create and update requests must contain JSON with this shape:

```json
{
  "name": "User Login",
  "service": "auth-service",
  "message": "User authenticated successfully",
  "eventType": "log",
  "timestamp": "2026-07-30T10:30:00.000Z"
}
```

`eventType` must be either `log` or `error`, and `timestamp` must be an ISO 8601 datetime.

Example:

```bash
curl -X POST http://localhost:8000/events \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "User Login",
    "service": "auth-service",
    "message": "User authenticated successfully",
    "eventType": "log",
    "timestamp": "2026-07-30T10:30:00.000Z"
  }'
```

## Project structure

```text
src/                 Express server, validation, and database access
prisma/schema.prisma Database schema
docs/openapi.json    OpenAPI specification
frontend/index.html  Browser dashboard
```

## Available scripts

| Command | Description |
| --- | --- |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Start the compiled API |
| `npm run run` | Build and start the API |
| `npm test` | Placeholder test command; tests are not configured yet |

