import { Router } from 'express';
import { genreRouter } from './genre.routes.js';
import { movieRouter } from './movie.routes.js';

export const apiRouter = Router();

apiRouter.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

apiRouter.use('/genres', genreRouter);
apiRouter.use('/movies', movieRouter);
