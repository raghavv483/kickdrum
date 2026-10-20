import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Database } from 'better-sqlite3';
import { db } from './connection.js';

const migrationsDir = join(dirname(fileURLToPath(import.meta.url)), 'migrations');

export function runMigrations(database: Database): void {
  database.exec(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version    TEXT PRIMARY KEY,
      applied_at TEXT NOT NULL
    );
  `);

  const applied = new Set(
    database
      .prepare<[], { version: string }>('SELECT version FROM schema_migrations')
      .all()
      .map((row) => row.version),
  );

  const files = readdirSync(migrationsDir)
    .filter((file) => file.endsWith('.sql'))
    .sort();

  const record = database.prepare(
    "INSERT INTO schema_migrations (version, applied_at) VALUES (?, datetime('now'))",
  );

  for (const file of files) {
    if (applied.has(file)) continue;

    const sql = readFileSync(join(migrationsDir, file), 'utf8');

    database.transaction(() => {
      database.exec(sql);
      record.run(file);
    })();

    console.log(`applied migration ${file}`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runMigrations(db);
  console.log('migrations up to date');
}
