import type { CreateReviewDto } from '../dtos/review.dto.js';
import { NotFoundError } from '../errors/http-errors.js';
import type { Review } from '../models/review.model.js';
import * as movieRepository from '../repositories/movie.repository.js';
import * as reviewRepository from '../repositories/review.repository.js';

export function getReviewsForMovie(movieId: number): Review[] {
  if (!movieRepository.existsById(movieId)) {
    throw new NotFoundError(`Movie ${movieId} not found`);
  }

  return reviewRepository.findByMovieId(movieId);
}

export function createReview(movieId: number, input: CreateReviewDto): Review {
  if (!movieRepository.existsById(movieId)) {
    throw new NotFoundError(`Movie ${movieId} not found`);
  }

  return reviewRepository.insert(movieId, input);
}
