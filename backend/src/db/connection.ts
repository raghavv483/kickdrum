import { mkdirSync } from 'node:fs';
import { dirname, isAbsolute, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import Database from 'better-sqlite3';
import { config } from '../config.js';

const backendRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..');

function resolveDbPath(path: string): string {
  if (path === ':memory:') return path;
  return isAbsolute(path) ? path : resolve(backendRoot, path);
}

const dbPath = resolveDbPath(config.dbPath);

if (dbPath !== ':memory:') {
  mkdirSync(dirname(dbPath), { recursive: true });
}

export const db = new Database(dbPath);

db.pragma('foreign_keys = ON');

if (dbPath !== ':memory:') {
  db.pragma('journal_mode = WAL');
}
