import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="page-state">
      <h1>Page not found</h1>
      <p>That page does not exist.</p>
      <Link to="/" className="back-link">
        ← All movies
      </Link>
    </div>
  );
}
