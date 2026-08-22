import { z } from "zod";

export const reviewSchema = z.object({
  rating: z
    .number()
    .min(1, "Please select a rating")
    .max(5, "Rating must be between 1 and 5"),
  comment: z
    .string()
    .trim()
    .min(10, "Comment must be at least 10 characters")
    .max(1000, "Comment must be under 1000 characters"),
});

export type ReviewInput = z.infer<typeof reviewSchema>;
