import { db } from '../db/connection.js';
import type { MovieDetail, MovieRow, MovieSummary } from '../models/movie.model.js';

function toMovie(row: MovieRow): MovieDetail {
  return {
    id: row.id,
    title: row.title,
    releaseYear: row.release_year,
    rating: row.rating,
    genre: {
      id: row.genre_id,
      name: row.genre_name,
    },
    description: row.description,
    director: row.director,
    durationMinutes: row.duration_minutes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function toMovieSummary(row: MovieRow): MovieSummary {
  return {
    id: row.id,
    title: row.title,
    releaseYear: row.release_year,
    rating: row.rating,
    genre: {
      id: row.genre_id,
      name: row.genre_name,
    },
  };
}

export function findAll(): MovieSummary[] {
  const rows = db
    .prepare<[], MovieRow>(
      `SELECT m.id,
              m.title,
              m.release_year,
              m.rating,
              g.id   AS genre_id,
              g.name AS genre_name
         FROM movies m
         JOIN genres g ON g.id = m.genre_id
        ORDER BY m.title`,
    )
    .all();

  return rows.map(toMovieSummary);
}

export function findById(id: number): MovieDetail | undefined {
  const row = db
    .prepare<[number], MovieRow>(
      `SELECT m.id,
              m.title,
              m.description,
              m.director,
              m.release_year,
              m.duration_minutes,
              m.rating,
              m.created_at,
              m.updated_at,
              g.id   AS genre_id,
              g.name AS genre_name
         FROM movies m
         JOIN genres g ON g.id = m.genre_id
        WHERE m.id = ?`,
    )
    .get(id);

  return row ? toMovie(row) : undefined;
}

export function existsById(id: number): boolean {
  const row = db
    .prepare<[number], { id: number }>('SELECT id FROM movies WHERE id = ?')
    .get(id);

  return row !== undefined;
}
