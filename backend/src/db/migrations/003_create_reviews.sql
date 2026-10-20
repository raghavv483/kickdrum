CREATE TABLE reviews (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  movie_id      INTEGER NOT NULL REFERENCES movies(id),
  reviewer_name TEXT    NOT NULL,
  rating        INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment       TEXT    NOT NULL DEFAULT '',
  created_at    TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX idx_reviews_movie_id ON reviews(movie_id);
