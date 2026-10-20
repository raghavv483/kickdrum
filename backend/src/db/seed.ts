import { fileURLToPath } from 'node:url';
import type { Database } from 'better-sqlite3';
import { db } from './connection.js';

const GENRES = ['Drama', 'Sci-Fi', 'Comedy', 'Thriller', 'Animation', 'Romance'];

interface SeedMovie {
  title: string;
  description: string;
  director: string;
  releaseYear: number;
  durationMinutes: number;
  rating: number;
  genre: string;
}

interface SeedReview {
  movieTitle: string;
  reviewerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

const MOVIES: SeedMovie[] = [
  {
    title: 'The Quiet Harbour',
    description:
      'A retired ferry captain returns to the coastal town he abandoned thirty years earlier. The daughter he left behind now runs the only dock in the bay.',
    director: 'Mireille Dansk',
    releaseYear: 2003,
    durationMinutes: 118,
    rating: 7.9,
    genre: 'Drama',
  },
  {
    title: 'Salt and Ember',
    description:
      'Two sisters inherit a failing salt flat and a debt neither of them knew about. What starts as a summer of paperwork becomes a reckoning with the family that built the place.',
    director: 'Tomas Varela',
    releaseYear: 2017,
    durationMinutes: 131,
    rating: 8.4,
    genre: 'Drama',
  },
  {
    title: 'Orbital Drift',
    description:
      'The crew of a decommissioned mining station wakes to find their orbit decaying and their records erased. The only voice on the radio claims to be one of them.',
    director: 'Hana Okonkwo',
    releaseYear: 2015,
    durationMinutes: 142,
    rating: 8.1,
    genre: 'Sci-Fi',
  },
  {
    title: 'The Last Signal',
    description:
      'A deep-space relay technician picks up a transmission that will not reach Earth for another century. She decides to answer it anyway.',
    director: 'Ivo Brandt',
    releaseYear: 2024,
    durationMinutes: 109,
    rating: 7.2,
    genre: 'Sci-Fi',
  },
  {
    title: 'Parking Lot Philosophers',
    description:
      'Three night-shift supermarket clerks solve the problems of the universe between restocking runs. None of them can solve the schedule for next week.',
    director: 'Gail Rutherford',
    releaseYear: 1998,
    durationMinutes: 97,
    rating: 6.8,
    genre: 'Comedy',
  },
  {
    title: 'Nine Lives of Mr. Pemberton',
    description:
      'An insurance adjuster keeps waking up on the morning of the worst audit of his career. He is starting to enjoy it.',
    director: 'Dev Rastogi',
    releaseYear: 2011,
    durationMinutes: 101,
    rating: 6.3,
    genre: 'Comedy',
  },
  {
    title: 'Cold Fathoms',
    description:
      'A salvage diver takes a job on a lake that the local council insists has no wreck in it. The sonar disagrees.',
    director: 'Anton Reiss',
    releaseYear: 1994,
    durationMinutes: 126,
    rating: 7.6,
    genre: 'Thriller',
  },
  {
    title: 'The Meridian Pact',
    description:
      'A junior translator at a trade summit realises both delegations are reading from the same forged treaty. She has nine hours before the signing.',
    director: 'Lena Ferraro',
    releaseYear: 2020,
    durationMinutes: 134,
    rating: 8.8,
    genre: 'Thriller',
  },
  {
    title: 'Paper Lanterns',
    description:
      'A girl who folds paper animals for a living discovers that the ones she gives away keep coming back. Each one carries a message from someone she has lost.',
    director: 'Yuki Tamura',
    releaseYear: 2009,
    durationMinutes: 88,
    rating: 9.1,
    genre: 'Animation',
  },
  {
    title: "Gravity's Garden",
    description:
      'On a world where plants grow toward sound instead of light, a young botanist is sent to find out why the valley has gone quiet.',
    director: 'Noor Hadid',
    releaseYear: 2022,
    durationMinutes: 95,
    rating: 8.2,
    genre: 'Animation',
  },
  {
    title: 'Letters to Avignon',
    description:
      'A postal clerk begins finishing the half-written letters that pass through her sorting office. One of her corrections reaches the wrong man at the right time.',
    director: 'Claire Besson',
    releaseYear: 2006,
    durationMinutes: 112,
    rating: 7.4,
    genre: 'Romance',
  },
  {
    title: 'Two Trains to Bellhaven',
    description:
      'Two strangers agree to meet in a town neither has been to, exactly one year after a delayed train put them on the same platform. Only one of them remembers the plan correctly.',
    director: 'Marcus Oyelaran',
    releaseYear: 2019,
    durationMinutes: 175,
    rating: 5.8,
    genre: 'Romance',
  },
];

const REVIEWS: SeedReview[] = [
  {
    movieTitle: 'The Quiet Harbour',
    reviewerName: 'Priya Raman',
    rating: 5,
    comment: 'The last twenty minutes on the dock are worth the whole slow build.',
    createdAt: '2024-02-11 09:14:00',
  },
  {
    movieTitle: 'The Quiet Harbour',
    reviewerName: 'Dale Whitmore',
    rating: 4,
    comment: 'Beautifully shot, though it takes its time getting anywhere.',
    createdAt: '2024-05-03 18:42:00',
  },
  {
    movieTitle: 'The Quiet Harbour',
    reviewerName: 'Sofia Lindqvist',
    rating: 4,
    comment: 'Dansk never explains more than she has to. I respect that.',
    createdAt: '2024-09-27 21:05:00',
  },
  {
    movieTitle: 'Salt and Ember',
    reviewerName: 'Marcus Hale',
    rating: 5,
    comment: 'Two performances carrying a very quiet script, and they manage it.',
    createdAt: '2024-01-19 12:30:00',
  },
  {
    movieTitle: 'Salt and Ember',
    reviewerName: 'Ana Belmonte',
    rating: 4,
    comment: 'The flashbacks are the weakest part, but the ending earns them back.',
    createdAt: '2024-06-14 08:55:00',
  },
  {
    movieTitle: 'Orbital Drift',
    reviewerName: 'Tomas Lindqvist',
    rating: 5,
    comment: 'Best use of silence in a space film since I can remember.',
    createdAt: '2023-11-02 16:20:00',
  },
  {
    movieTitle: 'Orbital Drift',
    reviewerName: 'Jen Okafor',
    rating: 4,
    comment: 'The middle act drags, but the reveal is genuinely well set up.',
    createdAt: '2024-03-08 19:11:00',
  },
  {
    movieTitle: 'Orbital Drift',
    reviewerName: 'Ravi Menon',
    rating: 5,
    comment: 'Watched it twice to catch the radio chatter. Worth it.',
    createdAt: '2024-07-21 22:40:00',
  },
  {
    movieTitle: 'Orbital Drift',
    reviewerName: 'Bea Kowalski',
    rating: 3,
    comment: 'Gorgeous to look at, a bit cold to sit through.',
    createdAt: '2024-10-05 10:02:00',
  },
  {
    movieTitle: 'Parking Lot Philosophers',
    reviewerName: 'Greg Santos',
    rating: 4,
    comment: 'Quotable from start to finish. The trolley bay argument is perfect.',
    createdAt: '2023-12-30 23:15:00',
  },
  {
    movieTitle: 'Parking Lot Philosophers',
    reviewerName: 'Nadia Oyelaran',
    rating: 3,
    comment: 'Funny in bursts. The third act forgets it was a comedy.',
    createdAt: '2024-04-17 13:48:00',
  },
  {
    movieTitle: 'Nine Lives of Mr. Pemberton',
    reviewerName: 'Owen Castellanos',
    rating: 3,
    comment: 'A one-joke premise stretched a little thin, but the lead sells it.',
    createdAt: '2024-02-28 17:33:00',
  },
  {
    movieTitle: 'Nine Lives of Mr. Pemberton',
    reviewerName: 'Hilda Brenner',
    rating: 4,
    comment: 'The audit montage had me in tears. Underrated.',
    createdAt: '2024-08-09 20:27:00',
  },
  {
    movieTitle: 'Cold Fathoms',
    reviewerName: 'Yusuf Demir',
    rating: 4,
    comment: 'Holds up far better than most thrillers of its decade.',
    createdAt: '2023-10-12 11:09:00',
  },
  {
    movieTitle: 'Cold Fathoms',
    reviewerName: 'Clara Nwosu',
    rating: 5,
    comment: 'The council meeting scene is scarier than anything underwater.',
    createdAt: '2024-05-22 15:54:00',
  },
  {
    movieTitle: 'Cold Fathoms',
    reviewerName: 'Peter Vance',
    rating: 3,
    comment: 'Great tension, muddy ending.',
    createdAt: '2024-09-01 09:38:00',
  },
  {
    movieTitle: 'The Meridian Pact',
    reviewerName: 'Ingrid Halvorsen',
    rating: 5,
    comment: 'Nine hours of screen time that feel like nine minutes.',
    createdAt: '2024-01-07 14:25:00',
  },
  {
    movieTitle: 'The Meridian Pact',
    reviewerName: 'Samuel Adeyemi',
    rating: 5,
    comment: 'Ferraro trusts the audience to keep up. Rare and welcome.',
    createdAt: '2024-06-30 07:46:00',
  },
  {
    movieTitle: 'The Meridian Pact',
    reviewerName: 'Louisa Pike',
    rating: 4,
    comment: 'The translation booth sequences are a masterclass in blocking.',
    createdAt: '2024-11-18 19:03:00',
  },
  {
    movieTitle: 'Paper Lanterns',
    reviewerName: 'Hannah Voss',
    rating: 5,
    comment: 'I have not cried at animation like this in years.',
    createdAt: '2023-09-25 10:41:00',
  },
  {
    movieTitle: 'Paper Lanterns',
    reviewerName: 'Kenji Mori',
    rating: 5,
    comment: 'Every frame of the folding sequences is hand-drawn. It shows.',
    createdAt: '2024-04-02 16:17:00',
  },
  {
    movieTitle: 'Paper Lanterns',
    reviewerName: 'Elena Fitzgerald',
    rating: 4,
    comment: 'The ending is a touch neat, but I forgave it immediately.',
    createdAt: '2024-08-26 12:52:00',
  },
  {
    movieTitle: "Gravity's Garden",
    reviewerName: 'Paulo Reyes',
    rating: 4,
    comment: 'A whole ecosystem invented from one good idea about sound.',
    createdAt: '2024-03-15 18:08:00',
  },
  {
    movieTitle: "Gravity's Garden",
    reviewerName: 'Mira Chaudhary',
    rating: 5,
    comment: 'My kids asked to watch it again the same evening.',
    createdAt: '2024-10-29 20:36:00',
  },
  {
    movieTitle: 'Letters to Avignon',
    reviewerName: 'Isabelle Marchand',
    rating: 4,
    comment: 'Quietly devastating in the way only a postal drama can be.',
    createdAt: '2024-02-05 08:21:00',
  },
  {
    movieTitle: 'Letters to Avignon',
    reviewerName: 'Tobias Lerner',
    rating: 3,
    comment: 'Charming, slight, over before it commits to anything.',
    createdAt: '2024-07-11 21:44:00',
  },
];

export function seed(database: Database): void {
  const movieCount = database
    .prepare<[], { count: number }>('SELECT COUNT(*) AS count FROM movies')
    .get();

  if (movieCount && movieCount.count > 0) {
    return;
  }

  const insertGenre = database.prepare('INSERT INTO genres (name) VALUES (?)');
  const insertMovie = database.prepare(`
    INSERT INTO movies (title, description, director, release_year, duration_minutes, rating, genre_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  const insertReview = database.prepare(`
    INSERT INTO reviews (movie_id, reviewer_name, rating, comment, created_at)
    VALUES (?, ?, ?, ?, ?)
  `);

  database.transaction(() => {
    const genreIds = new Map<string, number>();
    for (const name of GENRES) {
      const result = insertGenre.run(name);
      genreIds.set(name, Number(result.lastInsertRowid));
    }

    const movieIds = new Map<string, number>();
    for (const movie of MOVIES) {
      const genreId = genreIds.get(movie.genre);
      if (genreId === undefined) {
        throw new Error(`Unknown genre "${movie.genre}" for movie "${movie.title}"`);
      }
      const result = insertMovie.run(
        movie.title,
        movie.description,
        movie.director,
        movie.releaseYear,
        movie.durationMinutes,
        movie.rating,
        genreId,
      );
      movieIds.set(movie.title, Number(result.lastInsertRowid));
    }

    for (const review of REVIEWS) {
      const movieId = movieIds.get(review.movieTitle);
      if (movieId === undefined) {
        throw new Error(`Unknown movie "${review.movieTitle}" for review`);
      }
      insertReview.run(
        movieId,
        review.reviewerName,
        review.rating,
        review.comment,
        review.createdAt,
      );
    }
  })();

  console.log(`seeded ${GENRES.length} genres, ${MOVIES.length} movies, ${REVIEWS.length} reviews`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seed(db);
}
