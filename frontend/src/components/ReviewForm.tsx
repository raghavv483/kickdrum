import { useState, type FormEvent } from 'react';
import { ApiError, createReview } from '../lib/api';

interface ReviewFormProps {
  movieId: number;
  onSuccess: () => void;
}

export default function ReviewForm({ movieId, onSuccess }: ReviewFormProps) {
  const [reviewerName, setReviewerName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldErrors({});
    setFormError(null);

    if (reviewerName.trim() === '') {
      setFieldErrors({ reviewerName: 'Your name is required' });
      return;
    }

    setIsSubmitting(true);

    try {
      await createReview(movieId, { reviewerName: reviewerName.trim(), rating, comment });
      onSuccess();
    } catch (err) {
      if (err instanceof ApiError && err.details && err.details.length > 0) {
        setFieldErrors(
          Object.fromEntries(err.details.map((detail) => [detail.field, detail.message])),
        );
      } else if (err instanceof ApiError) {
        setFormError(err.message);
      } else {
        setFormError('Could not save your review. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="review-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="reviewerName">Your name</label>
        <input
          id="reviewerName"
          type="text"
          value={reviewerName}
          maxLength={60}
          onChange={(event) => setReviewerName(event.target.value)}
        />
        {fieldErrors.reviewerName && <p className="field-error">{fieldErrors.reviewerName}</p>}
      </div>

      <div className="field">
        <label htmlFor="rating">Rating</label>
        <select
          id="rating"
          value={rating}
          onChange={(event) => setRating(Number(event.target.value))}
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        {fieldErrors.rating && <p className="field-error">{fieldErrors.rating}</p>}
      </div>

      <div className="field">
        <label htmlFor="comment">Comment</label>
        <textarea
          id="comment"
          rows={4}
          maxLength={500}
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        {fieldErrors.comment && <p className="field-error">{fieldErrors.comment}</p>}
      </div>

      {formError && <p className="field-error">{formError}</p>}

      <button type="submit" className="button primary" disabled={isSubmitting}>
        {isSubmitting ? 'Saving…' : 'Submit review'}
      </button>
    </form>
  );
}
