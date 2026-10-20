export interface Review {
  id: number;
  movieId: number;
  reviewerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface ReviewRow {
  id: number;
  movie_id: number;
  reviewer_name: string;
  rating: number;
  comment: string;
  created_at: string;
}
