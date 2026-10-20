import { db } from '../db/connection.js';
import type { CreateReviewDto } from '../dtos/review.dto.js';
import type { Review, ReviewRow } from '../models/review.model.js';

function toReview(row: ReviewRow): Review {
  return {
    id: row.id,
    movieId: row.movie_id,
    reviewerName: row.reviewer_name,
    rating: row.rating,
    comment: row.comment,
    createdAt: row.created_at,
  };
}

export function findByMovieId(movieId: number): Review[] {
  const rows = db
    .prepare<[number], ReviewRow>(
      `SELECT id, movie_id, reviewer_name, rating, comment, created_at
         FROM reviews
        WHERE movie_id = ?
        ORDER BY created_at DESC, id DESC`,
    )
    .all(movieId);

  return rows.map(toReview);
}

export function insert(movieId: number, input: CreateReviewDto): Review {
  const result = db
    .prepare<[number, string, number, string]>(
      `INSERT INTO reviews (movie_id, reviewer_name, rating, comment)
            VALUES (?, ?, ?, ?)`,
    )
    .run(movieId, input.reviewerName, input.rating, input.comment);

  const row = db
    .prepare<[number | bigint], ReviewRow>(
      `SELECT id, movie_id, reviewer_name, rating, comment, created_at
         FROM reviews
        WHERE id = ?`,
    )
    .get(result.lastInsertRowid);

  if (!row) {
    throw new Error(`Review ${result.lastInsertRowid} vanished after insert`);
  }

  return toReview(row);
}
