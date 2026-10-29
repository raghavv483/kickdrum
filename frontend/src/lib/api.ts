import type {
  ApiErrorBody,
  ApiErrorDetail,
  CreateReviewInput,
  Genre,
  MovieDetail,
  MovieInput,
  MovieSummary,
  Review,
} from './types';

const BASE_URL = '/api';

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details?: ApiErrorDetail[];

  constructor(status: number, code: string, message: string, details?: ApiErrorDetail[]) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...init?.headers,
    },
  });

  const text = await response.text();
  const body = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const error = (body as ApiErrorBody | null)?.error;
    throw new ApiError(
      response.status,
      error?.code ?? 'INTERNAL_ERROR',
      error?.message ?? `Request failed with status ${response.status}`,
      error?.details,
    );
  }

  return body as T;
}

export function getMovies(): Promise<MovieSummary[]> {
  return request<MovieSummary[]>('/movies');
}

export function getMovie(id: number): Promise<MovieDetail> {
  return request<MovieDetail>(`/movies/${id}`);
}

export function getGenres(): Promise<Genre[]> {
  return request<Genre[]>('/genres');
}

export function getReviews(movieId: number): Promise<Review[]> {
  return request<Review[]>(`/movies/${movieId}/reviews`);
}

export function createReview(movieId: number, input: CreateReviewInput): Promise<Review> {
  return request<Review>(`/movies/${movieId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(input),
  });
}
export function updateMovie(movieId: number,input: MovieInput): Promise<MovieDetail>{
  return request<MovieDetail>(`/movies/${movieId}`,{
    method: 'PUT',
    body: JSON.stringify(input),
  })
}
