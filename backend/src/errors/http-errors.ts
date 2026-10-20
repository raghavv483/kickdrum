export type ErrorCode = 'VALIDATION_ERROR' | 'BAD_REQUEST' | 'NOT_FOUND' | 'INTERNAL_ERROR';

export interface ErrorDetail {
  field: string;
  message: string;
}

export abstract class AppError extends Error {
  abstract readonly status: number;
  abstract readonly code: ErrorCode;
  readonly details?: ErrorDetail[];

  constructor(message: string, details?: ErrorDetail[]) {
    super(message);
    this.name = new.target.name;
    this.details = details;
  }
}

export class BadRequestError extends AppError {
  readonly status = 400;
  readonly code = 'BAD_REQUEST' as const;
}

export class NotFoundError extends AppError {
  readonly status = 404;
  readonly code = 'NOT_FOUND' as const;
}
