import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '../src/app.js';

describe('GET /api/movies', () => {
  it('returns every movie with a summary shape', async () => {
    const res = await request(app).get('/api/movies');

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(12);
    expect(res.body[0]).toEqual({
      id: expect.any(Number),
      title: expect.any(String),
      releaseYear: expect.any(Number),
      rating: expect.any(Number),
      genre: { id: expect.any(Number), name: expect.any(String) },
    });
  });

  it('sorts movies by title', async () => {
    const res = await request(app).get('/api/movies');

    const titles = res.body.map((movie: { title: string }) => movie.title);
    expect(titles).toEqual([...titles].sort());
  });
});

describe('GET /api/movies/:id', () => {
  it('returns the movie with its genre and camelCase fields', async () => {
    const res = await request(app).get('/api/movies/1');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: 1,
      title: expect.any(String),
      releaseYear: expect.any(Number),
      rating: expect.any(Number),
      genre: { id: expect.any(Number), name: expect.any(String) },
      description: expect.any(String),
      director: expect.any(String),
      durationMinutes: expect.any(Number),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  it('returns 404 for a movie that does not exist', async () => {
    const res = await request(app).get('/api/movies/9999');

    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe('NOT_FOUND');
  });

  it('returns 400 for an id that is not a number', async () => {
    const res = await request(app).get('/api/movies/abc');

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('BAD_REQUEST');
  });
});
