import type { NextFunction, Request, Response } from 'express';
import type { CreateReviewDto } from '../dtos/review.dto.js';
import * as reviewService from '../services/review.service.js';
import { parseId } from '../utils/parse-id.js';

export function listReviews(req: Request<{ id: string }>, res: Response, next: NextFunction): void {
  try {
    const movieId = parseId(req.params.id, 'movie id');
    res.status(200).json(reviewService.getReviewsForMovie(movieId));
  } catch (err) {
    next(err);
  }
}

export function createReview(req: Request<{ id: string }>, res: Response, next: NextFunction): void {
  try {
    const movieId = parseId(req.params.id, 'movie id');
    const input = req.body as CreateReviewDto;
    res.status(201).json(reviewService.createReview(movieId, input));
  } catch (err) {
    next(err);
  }
}
