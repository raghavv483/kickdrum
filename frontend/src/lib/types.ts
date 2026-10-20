export interface Genre {
  id: number;
  name: string;
}

export interface MovieSummary {
  id: number;
  title: string;
  releaseYear: number;
  rating: number;
  genre: Genre;
}

export interface MovieDetail extends MovieSummary {
  description: string;
  director: string;
  durationMinutes: number;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: number;
  movieId: number;
  reviewerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface CreateReviewInput {
  reviewerName: string;
  rating: number;
  comment: string;
}

export interface ApiErrorDetail {
  field: string;
  message: string;
}

export interface ApiErrorBody {
  error: {
    code: 'VALIDATION_ERROR' | 'BAD_REQUEST' | 'NOT_FOUND' | 'INTERNAL_ERROR';
    message: string;
    details?: ApiErrorDetail[];
  };
}
