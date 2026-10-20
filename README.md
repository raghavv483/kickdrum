# CineVault

A small movie catalog: browse a library of films, open a film for its details, and read or
write reviews. Node/Express + SQLite on the back, React + Vite on the front.

## Prerequisites

- Node.js 20 or newer
- npm 10 or newer

## Running locally

```bash
npm install
npm run db:reset   # create the SQLite file, migrate it, seed it
npm run dev        # API on :4000, web on :5173
```

Open http://localhost:5173. The Vite dev server proxies `/api` to the API on port 4000, so
there is nothing to configure for local development.

## Running in Codespaces

Open the repository in a Codespace. The container installs dependencies and resets the
database on create, then starts both servers on attach, so the app is already running when
the editor opens.

Use the **Ports** tab to reach it:

| Port | Label           | What to open                                                |
| ---- | --------------- | ----------------------------------------------------------- |
| 5173 | Frontend (Vite) | Click the globe icon to open the app in a browser tab.      |
| 4000 | Backend API     | Append a path, e.g. `/api/health`, to hit the API directly. |

If the servers are not running, start them with `npm run dev`.

## Scripts

Run these from the repository root.

| Script               | What it does                                       |
| -------------------- | -------------------------------------------------- |
| `npm run dev`        | Runs the API (`api`) and the web app (`web`) together. |
| `npm test`           | Runs the backend test suite.                       |
| `npm run build`      | Typechecks the backend and builds the frontend.    |
| `npm run db:migrate` | Applies any pending migrations.                    |
| `npm run db:seed`    | Seeds the database if the `movies` table is empty. |
| `npm run db:reset`   | Deletes the SQLite files, then migrates and seeds. |

## Project structure

```
cinevault/
├── backend/
│   ├── src/
│   │   ├── app.ts            # builds the Express app
│   │   ├── server.ts         # starts it
│   │   ├── db/               # connection, migrations, seed
│   │   ├── routes/           # paths -> controllers
│   │   ├── controllers/      # request/response handling
│   │   ├── services/         # business rules
│   │   ├── repositories/     # all SQL lives here
│   │   ├── dtos/             # zod request schemas
│   │   ├── models/           # API and row types
│   │   ├── middleware/       # validation, errors, 404
│   │   ├── errors/           # AppError subclasses
│   │   └── utils/
│   └── tests/
└── frontend/
    └── src/
        ├── pages/            # one component per route
        ├── components/       # shared UI
        └── lib/              # api client and types
```

A request flows `route -> controller -> service -> repository`. Controllers never contain
SQL or business rules, and repositories are the only place SQL is written.

## API

Base path `/api`. Responses are JSON with camelCase keys.

| Method | Path                      | Returns                            |
| ------ | ------------------------- | ---------------------------------- |
| GET    | `/api/health`             | `{ status: "ok" }`                 |
| GET    | `/api/genres`             | Genres, sorted by name             |
| GET    | `/api/movies`             | Movie summaries, sorted by title   |
| GET    | `/api/movies/:id`         | One movie with its genre           |
| GET    | `/api/movies/:id/reviews` | Reviews for a movie, newest first  |
| POST   | `/api/movies/:id/reviews` | Creates a review, returns it (201) |

Errors always use the same envelope:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Request body is invalid",
    "details": [{ "field": "rating", "message": "Rating must be between 1 and 5" }]
  }
}
```

`code` is one of `VALIDATION_ERROR`, `BAD_REQUEST`, `NOT_FOUND` or `INTERNAL_ERROR`.
`details` is present on validation failures.

Authentication is out of scope.

## Database

SQLite via `better-sqlite3`. The file lives at `backend/data/cinevault.db` and is
gitignored; override the location with `DB_PATH`.

Migrations are plain `.sql` files in `backend/src/db/migrations/`, applied in filename
order and tracked in `schema_migrations`.

**Never edit an applied migration.** To change the schema, add a new numbered file
(`004_....sql`) and run `npm run db:migrate`. Editing a file that has already run leaves
every existing database out of step with the code, because applied migrations are skipped.

## Tests

```bash
npm test
```

The suite is backend-only and runs against an in-memory SQLite database (`DB_PATH=:memory:`),
migrated and seeded fresh for each run, so it never touches your development database.
