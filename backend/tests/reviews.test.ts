import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '../src/app.js';

describe('GET /api/movies/:id/reviews', () => {
  it('returns the reviews for a movie', async () => {
    const res = await request(app).get('/api/movies/1/reviews');

    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0]).toEqual({
      id: expect.any(Number),
      movieId: 1,
      reviewerName: expect.any(String),
      rating: expect.any(Number),
      comment: expect.any(String),
      createdAt: expect.any(String),
    });
  });

  it('returns 404 when the movie does not exist', async () => {
    const res = await request(app).get('/api/movies/9999/reviews');

    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe('NOT_FOUND');
  });
});

describe('POST /api/movies/:id/reviews', () => {
  it('creates a review and returns it in the list', async () => {
    const res = await request(app)
      .post('/api/movies/2/reviews')
      .send({ reviewerName: 'Test Viewer', rating: 4, comment: 'Solid second act.' });

    expect(res.status).toBe(201);
    expect(res.body).toEqual({
      id: expect.any(Number),
      movieId: 2,
      reviewerName: 'Test Viewer',
      rating: 4,
      comment: 'Solid second act.',
      createdAt: expect.any(String),
    });

    const list = await request(app).get('/api/movies/2/reviews');
    expect(list.body.map((review: { id: number }) => review.id)).toContain(res.body.id);
  });

  it('returns 400 when reviewerName is missing', async () => {
    const res = await request(app).post('/api/movies/2/reviews').send({ rating: 3 });

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
    expect(res.body.error.details).toContainEqual({
      field: 'reviewerName',
      message: expect.any(String),
    });
  });

  it('returns 400 when rating is out of range', async () => {
    const res = await request(app)
      .post('/api/movies/2/reviews')
      .send({ reviewerName: 'Test Viewer', rating: 6 });

    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('returns 404 when the movie does not exist', async () => {
    const res = await request(app)
      .post('/api/movies/9999/reviews')
      .send({ reviewerName: 'Test Viewer', rating: 3 });

    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe('NOT_FOUND');
  });
});
