import type { MovieDTO } from '../dtos/movie.dto.js';
import { BadRequestError, NotFoundError } from '../errors/http-errors.js';
import type { MovieDetail, MovieSummary } from '../models/movie.model.js';
import * as genreRepository from '../repositories/genre.repository.js';
import * as movieRepository from '../repositories/movie.repository.js';

function assertGenreExists(genreId: number): void {
  if (!genreRepository.existsById(genreId)) {
    throw new BadRequestError(`Genre ${genreId} does not exist`);
  }
}

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

export function updateMovie(id: number, input: MovieDTO): MovieDetail {
  if (!movieRepository.existsById(id)) {
    throw new NotFoundError(`Movie ${id} not found`);
  }

  assertGenreExists(input.genreId);

  const updated = movieRepository.update(id, input);

  if (!updated) {
    throw new NotFoundError(`Movie ${id} not found`);
  }

  return updated;
}