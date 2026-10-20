import { z } from 'zod';

export const createReviewSchema = z.object({
  reviewerName: z.string().trim().min(1, 'Reviewer name is required').max(60, 'Reviewer name must be 60 characters or fewer'),
  rating: z.number().int('Rating must be a whole number').min(1, 'Rating must be between 1 and 5').max(5, 'Rating must be between 1 and 5'),
  comment: z.string().max(500, 'Comment must be 500 characters or fewer').optional().default(''),
});

export type CreateReviewDto = z.infer<typeof createReviewSchema>;
