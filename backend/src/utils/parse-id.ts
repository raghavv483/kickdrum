import { BadRequestError } from '../errors/http-errors.js';

export function parseId(value: string, label = 'id'): number {
  if (!/^\d+$/.test(value)) {
    throw new BadRequestError(`Invalid ${label}: "${value}" is not a positive integer`);
  }

  const parsed = Number(value);

  if (!Number.isSafeInteger(parsed) || parsed < 1) {
    throw new BadRequestError(`Invalid ${label}: "${value}" is not a positive integer`);
  }

  return parsed;
}
