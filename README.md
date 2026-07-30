# Eventus

Eventus is a small event-management service for storing and viewing service logs and errors. It consists of an Express REST API, a PostgreSQL database accessed through Prisma, and a lightweight browser dashboard.

## Features

- Create, read, update, and delete events
- Event types: `log` and `error`
- Cursor-based pagination with up to five events per page
- Newest-first ordering using `createdAt`
- Health and event-count endpoints
- Zod validation for request bodies and query parameters
- Docker Compose setup with PostgreSQL
- Static dashboard for browsing and managing events

## Requirements

- Node.js 24+ (the Docker image uses Node 24)
- npm
- PostgreSQL, or Docker Desktop for the Compose setup

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

   For a locally running PostgreSQL instance, change the host in `DATABASE_URL` from `db` to `localhost`. The other variables in `.env.example` configure the PostgreSQL container used by Docker Compose.

3. Generate the Prisma client and sync the database schema:

   ```bash
   npx prisma generate
   npx prisma db push
   ```

   The current repository tracks the Prisma schema but does not include migration files. Use `prisma db push` for the current local setup.

## Run locally

Build and start the API:

```bash
npm run build
npm start
```

Or build and start it with one command:

```bash
npm run run
```

The API listens on `http://localhost:8000`.

## Run with Docker Compose

Docker Compose starts the API and a PostgreSQL 16 database:

```bash
cp .env.example .env
docker compose up --build
```

The API is available at `http://localhost:8000` and PostgreSQL is exposed on port `5432`. The Compose app container runs `prisma migrate deploy` before starting the API; migration files must be available if you use that startup command.

To stop the services:

```bash
docker compose down
```

Add `-v` to the shutdown command only if you also want to remove the persisted PostgreSQL volume.

## Dashboard

The dashboard is a standalone HTML file at [`frontend/index.html`](frontend/index.html). Open it in a browser while the API is running. It is configured to call `http://localhost:8000` and uses the API to:

- Display health and total event count
- Browse events five at a time
- Create and edit events
- Delete events

Tailwind CSS is loaded from the CDN, so the dashboard needs network access when opened directly.

## API

The complete API description is available at [`docs/openapi.json`](docs/openapi.json).

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

`GET /events` returns up to five events ordered by `createdAt`, newest first. Pass the returned `nextId` as a query parameter to request the next page:

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

`eventType` must be `log` or `error`, and `timestamp` must be an ISO 8601 datetime. The server generates `id` and `createdAt` values.

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
src/app.ts           Express application and server entry point
src/routes.ts        Event route definitions
src/service.ts       Event request handlers and database operations
src/schema.ts        Zod request/response schemas
src/db.ts            Prisma client configuration
prisma/schema.prisma Database schema
docs/openapi.json    OpenAPI specification
frontend/index.html  Browser dashboard
dockerfile           Production container image
docker-compose.yaml  API and PostgreSQL services
```

## Available scripts

| Command | Description |
| --- | --- |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Start the compiled API from `dist/app.js` |
| `npm run run` | Build and start the API |
| `npm test` | Placeholder command; tests are not configured yet |

