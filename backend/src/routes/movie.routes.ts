import { Router } from 'express';
import * as movieController from '../controllers/movie.controller.js';
import { reviewRouter } from './review.routes.js';
import { validateBody } from '../middleware/validate.js';
import { movieSchema } from '../dtos/movie.dto.js';

export const movieRouter = Router();

movieRouter.get('/', movieController.listMovies);
movieRouter.get('/:id', movieController.getMovie);
movieRouter.put('/:id', validateBody(movieSchema), movieController.updateMovie);
movieRouter.use('/:id/reviews', reviewRouter);
