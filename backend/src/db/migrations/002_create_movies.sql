CREATE TABLE movies (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  title            TEXT    NOT NULL,
  description      TEXT    NOT NULL DEFAULT '',
  director         TEXT    NOT NULL,
  release_year     INTEGER NOT NULL CHECK (release_year BETWEEN 1888 AND 2100),
  duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
  rating           REAL    NOT NULL CHECK (rating BETWEEN 0 AND 10),
  genre_id         INTEGER NOT NULL REFERENCES genres(id),
  created_at       TEXT    NOT NULL DEFAULT (datetime('now')),
  updated_at       TEXT    NOT NULL DEFAULT (datetime('now')),
  UNIQUE (title, release_year)
);
