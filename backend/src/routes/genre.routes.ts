import { Router } from 'express';
import * as genreController from '../controllers/genre.controller.js';

export const genreRouter = Router();

genreRouter.get('/', genreController.listGenres);
