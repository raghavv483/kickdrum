import type { NextFunction, Request, Response } from 'express';
import * as genreService from '../services/genre.service.js';

export function listGenres(_req: Request, res: Response, next: NextFunction): void {
  try {
    res.status(200).json(genreService.getGenres());
  } catch (err) {
    next(err);
  }
}
