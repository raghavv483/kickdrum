import { Router } from 'express';
import * as reviewController from '../controllers/review.controller.js';
import { createReviewSchema } from '../dtos/review.dto.js';
import { validateBody } from '../middleware/validate.js';

export const reviewRouter = Router({ mergeParams: true });

reviewRouter.get('/', reviewController.listReviews);
reviewRouter.post('/', validateBody(createReviewSchema), reviewController.createReview);
