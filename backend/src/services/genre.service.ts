import * as genreRepository from '../repositories/genre.repository.js';
import type { Genre } from '../models/genre.model.js';

export function getGenres(): Genre[] {
  return genreRepository.findAll();
}
