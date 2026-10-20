import { Link } from 'react-router-dom';
import type { MovieSummary } from '../lib/types';

const GENRE_COLORS: Record<string, string> = {
  Drama: '#4b5d8c',
  'Sci-Fi': '#2f6f6a',
  Comedy: '#9a6b2f',
  Thriller: '#7a3b4e',
  Animation: '#5b4a8a',
  Romance: '#8c4a63',
};

const FALLBACK_COLOR = '#55606e';

function initials(title: string): string {
  return title
    .split(/\s+/)
    .filter((word) => /[a-zA-Z0-9]/.test(word))
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join('');
}

export default function MovieCard({ movie }: { movie: MovieSummary }) {
  const color = GENRE_COLORS[movie.genre.name] ?? FALLBACK_COLOR;

  return (
    <Link to={`/movies/${movie.id}`} className="movie-card">
      <div className="poster" style={{ backgroundColor: color }} aria-hidden="true">
        <span className="poster-initials">{initials(movie.title)}</span>
      </div>
      <div className="movie-card-body">
        <h2 className="movie-card-title">{movie.title}</h2>
        <p className="movie-card-meta">
          <span>{movie.releaseYear}</span>
          <span className="dot">·</span>
          <span>{movie.genre.name}</span>
        </p>
      </div>
      <span className="rating-badge">{movie.rating.toFixed(1)}</span>
    </Link>
  );
}
