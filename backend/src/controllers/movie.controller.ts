import type { NextFunction, Request, Response } from 'express';
import * as movieService from '../services/movie.service.js';
import { parseId } from '../utils/parse-id.js';

export function listMovies(_req: Request, res: Response, next: NextFunction): void {
  try {
    res.status(200).json(movieService.getMovies());
  } catch (err) {
    next(err);
  }
}

export function getMovie(req: Request<{ id: string }>, res: Response, next: NextFunction): void {
  try {
    const id = parseId(req.params.id, 'movie id');
    res.status(200).json(movieService.getMovieById(id));
  } catch (err) {
    next(err);
  }
}
