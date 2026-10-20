import { db } from '../db/connection.js';
import type { Genre, GenreRow } from '../models/genre.model.js';

function toGenre(row: GenreRow): Genre {
  return {
    id: row.id,
    name: row.name,
  };
}

export function findAll(): Genre[] {
  const rows = db
    .prepare<[], GenreRow>('SELECT id, name FROM genres ORDER BY name')
    .all();

  return rows.map(toGenre);
}
