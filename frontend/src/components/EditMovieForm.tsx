import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { ApiError, getGenres, updateMovie } from '../lib/api';
import type { Genre, MovieDetail } from '../lib/types';

interface EditMovieFormProps {
  movie: MovieDetail;
  onSaved: (movie: MovieDetail) => void;
  onCancel: () => void;
}

type FieldElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export default function EditMovieForm({ movie, onSaved, onCancel }: EditMovieFormProps) {
  // all inputs in one object, prefilled with the current movie
  const [form, setForm] = useState({
    title: movie.title,
    director: movie.director,
    description: movie.description,
    releaseYear: String(movie.releaseYear),
    durationMinutes: String(movie.durationMinutes),
    rating: String(movie.rating),
    genreId: String(movie.genre.id),
  });
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // load genres for the dropdown
  useEffect(() => {
    getGenres().then(setGenres);
  }, []);

  // one handler for every input: uses the input's name to know which field changed
  function handleChange(e: ChangeEvent<FieldElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setIsSaving(true);

    try {
      const updated = await updateMovie(movie.id, {
        title: form.title,
        director: form.director,
        description: form.description,
        releaseYear: Number(form.releaseYear),
        durationMinutes: Number(form.durationMinutes),
        rating: Number(form.rating),
        genreId: Number(form.genreId),
      });
      onSaved(updated);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.details?.[0]?.message ?? err.message);
      } else {
        setError('Could not save the movie');
      }
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <div className="field">
        <label>Title</label>
        <input name="title" value={form.title} onChange={handleChange} />
      </div>

      <div className="field">
        <label>Director</label>
        <input name="director" value={form.director} onChange={handleChange} />
      </div>

      <div className="field">
        <label>Release year</label>
        <input name="releaseYear" type="number" value={form.releaseYear} onChange={handleChange} />
      </div>

      <div className="field">
        <label>Duration (minutes)</label>
        <input name="durationMinutes" type="number" value={form.durationMinutes} onChange={handleChange} />
      </div>

      <div className="field">
        <label>Rating (0-10)</label>
        <input name="rating" type="number" step={0.1} value={form.rating} onChange={handleChange} />
      </div>

      <div className="field">
        <label>Genre</label>
        <select name="genreId" value={form.genreId} onChange={handleChange}>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label>Description</label>
        <textarea name="description" rows={4} value={form.description} onChange={handleChange} />
      </div>

      {error && <p className="field-error">{error}</p>}

      <button type="submit" className="button primary" disabled={isSaving}>
        {isSaving ? 'Saving…' : 'Save changes'}
      </button>
      <button type="button" className="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}