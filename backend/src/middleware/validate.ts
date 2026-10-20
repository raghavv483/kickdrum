import type { NextFunction, Request, Response } from 'express';
import type { ZodTypeAny, z } from 'zod';

export function validateBody<Schema extends ZodTypeAny>(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Request body is invalid',
          details: result.error.issues.map((issue) => ({
            field: issue.path.join('.') || '(body)',
            message: issue.message,
          })),
        },
      });
      return;
    }

    req.body = result.data as z.infer<Schema>;
    next();
  };
}
