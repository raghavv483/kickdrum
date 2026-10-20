import { NotFoundError } from '../errors/http-errors.js';
import type { MovieDetail, MovieSummary } from '../models/movie.model.js';
import * as movieRepository from '../repositories/movie.repository.js';

export function getMovies(): MovieSummary[] {
  return movieRepository.findAll();
}

export function getMovieById(id: number): MovieDetail {
  const movie = movieRepository.findById(id);

  if (!movie) {
    throw new NotFoundError(`Movie ${id} not found`);
  }

  return movie;
}
