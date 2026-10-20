import { useEffect, useState } from 'react';
import ErrorMessage from '../components/ErrorMessage';
import MovieCard from '../components/MovieCard';
import Spinner from '../components/Spinner';
import { getMovies } from '../lib/api';
import type { MovieSummary } from '../lib/types';

export default function HomePage() {
  const [movies, setMovies] = useState<MovieSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    setIsLoading(true);
    getMovies()
      .then((data) => {
        if (active) {
          setMovies(data);
          setError(null);
        }
      })
      .catch((err: unknown) => {
        if (active) {
          setError(err instanceof Error ? err.message : 'Could not load movies.');
        }
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  if (isLoading) return <Spinner label="Loading movies…" />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section>
      <h1 className="page-title">
        All movies <span className="count">{movies.length}</span>
      </h1>
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}
