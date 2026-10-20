import { db } from '../src/db/connection.js';
import { runMigrations } from '../src/db/migrate.js';
import { seed } from '../src/db/seed.js';

runMigrations(db);
seed(db);
