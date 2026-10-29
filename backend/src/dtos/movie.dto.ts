import { z } from "zod";

export const movieSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Title must not exceed 200 characters"),

  description: z
    .string()
    .trim()
    .max(2000, "Description must not exceed 2000 characters"),

  director: z
    .string()
    .trim()
    .min(1, "Director is required")
    .max(120, "Director must not exceed 120 characters"),

  releaseYear: z
    .number()
    .int("Release year must be a whole number")
    .min(1888, "Release year must be at least 1888")
    .max(2100, "Release year must not exceed 2100"),

  durationMinutes: z
    .number()
    .int("Duration must be a whole number")
    .positive("Duration must be positive"),

  rating: z
    .number()
    .min(0, "Rating must be at least 0")
    .max(5, "Rating must not exceed 5"),

  genreId: z
    .number()
    .int("Genre ID must be a whole number")
    .positive("Genre ID must be positive"),
});

export type MovieDTO = z.infer<typeof movieSchema>;