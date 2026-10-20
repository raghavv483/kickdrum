import { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';
import Modal from '../components/Modal';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import Spinner from '../components/Spinner';
import { ApiError, getMovie, getReviews } from '../lib/api';
import type { MovieDetail, Review } from '../lib/types';

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return hours > 0 ? `${hours}h ${rest}m` : `${rest}m`;
}

function formatDate(value: string): string {
  const date = new Date(value.replace(' ', 'T') + 'Z');
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function MovieDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const movieId = Number(id);

  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const loadReviews = useCallback(() => {
    return getReviews(movieId)
      .then(setReviews)
      .catch(() => setReviews([]));
  }, [movieId]);

  useEffect(() => {
    let active = true;

    setIsLoading(true);
    setNotFound(false);
    setError(null);

    Promise.all([getMovie(movieId), getReviews(movieId)])
      .then(([movieData, reviewData]) => {
        if (!active) return;
        setMovie(movieData);
        setReviews(reviewData);
      })
      .catch((err: unknown) => {
        if (!active) return;
        if (err instanceof ApiError && err.status === 404) {
          setNotFound(true);
        } else {
          setError(err instanceof Error ? err.message : 'Could not load this movie.');
        }
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [movieId]);

  function handleReviewCreated() {
    setIsFormOpen(false);
    void loadReviews();
  }

  if (isLoading) return <Spinner label="Loading movie…" />;

  if (notFound) {
    return (
      <div className="page-state">
        <h1>Movie not found</h1>
        <p>We could not find that movie in the catalog.</p>
        <Link to="/" className="back-link">
          ← All movies
        </Link>
      </div>
    );
  }

  if (error) return <ErrorMessage message={error} />;
  if (!movie) return null;

  return (
    <article>
      <Link to="/" className="back-link">
        ← All movies
      </Link>

      <header className="movie-header">
        <h1 className="movie-title">
          {movie.title} <span className="movie-year">({movie.releaseYear})</span>
        </h1>
        <div className="movie-tags">
          <span className="genre-badge">{movie.genre.name}</span>
          <span className="rating-badge large">{movie.rating.toFixed(1)}/10</span>
        </div>
      </header>

      <dl className="movie-facts">
        <div>
          <dt>Director</dt>
          <dd>{movie.director}</dd>
        </div>
        <div>
          <dt>Duration</dt>
          <dd>{formatDuration(movie.durationMinutes)}</dd>
        </div>
        <div>
          <dt>Last updated</dt>
          <dd>{formatDate(movie.updatedAt)}</dd>
        </div>
      </dl>

      <p className="movie-description">{movie.description}</p>

      <section className="reviews-section">
        <div className="section-header">
          <h2>Reviews</h2>
          <button type="button" className="button primary" onClick={() => setIsFormOpen(true)}>
            Write a review
          </button>
        </div>
        <ReviewList reviews={reviews} />
      </section>

      <Modal isOpen={isFormOpen} title="Write a review" onClose={() => setIsFormOpen(false)}>
        <ReviewForm movieId={movie.id} onSuccess={handleReviewCreated} />
      </Modal>
    </article>
  );
}
