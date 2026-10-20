import type { Genre } from './genre.model.js';

export interface MovieSummary {
  id: number;
  title: string;
  releaseYear: number;
  rating: number;
  genre: Genre;
}

export interface MovieDetail extends MovieSummary {
  description: string;
  director: string;
  durationMinutes: number;
  createdAt: string;
  updatedAt: string;
}

export interface MovieRow {
  id: number;
  title: string;
  description: string;
  director: string;
  release_year: number;
  duration_minutes: number;
  rating: number;
  created_at: string;
  updated_at: string;
  genre_id: number;
  genre_name: string;
}
