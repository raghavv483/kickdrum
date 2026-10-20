import { Router } from 'express';
import * as movieController from '../controllers/movie.controller.js';
import { reviewRouter } from './review.routes.js';

export const movieRouter = Router();

movieRouter.get('/', movieController.listMovies);
movieRouter.get('/:id', movieController.getMovie);
movieRouter.use('/:id/reviews', reviewRouter);
