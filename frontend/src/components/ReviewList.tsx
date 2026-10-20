import type { Review } from '../lib/types';

function formatDate(value: string): string {
  const date = new Date(value.replace(' ', 'T') + 'Z');
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return <p className="empty-state">No reviews yet.</p>;
  }

  return (
    <ul className="review-list">
      {reviews.map((review) => (
        <li key={review.id} className="review">
          <div className="review-header">
            <span className="review-author">{review.reviewerName}</span>
            <span className="review-stars" aria-label={`${review.rating} out of 5`}>
              {'★'.repeat(review.rating)}
              <span className="stars-dim">{'★'.repeat(5 - review.rating)}</span>
            </span>
          </div>
          {review.comment && <p className="review-comment">{review.comment}</p>}
          <p className="review-date">{formatDate(review.createdAt)}</p>
        </li>
      ))}
    </ul>
  );
}
