import { z } from "zod";

export const propertySchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(150, "Title must be under 150 characters"),
  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters")
    .max(3000, "Description must be under 3000 characters"),
  price: z
    .number({ error: "Price is required" })
    .positive("Price must be greater than 0"),
  location: z.string().trim().min(3, "Location is required"),
  categoryId: z.string().min(1, "Please select a category"),
  amenities: z.array(z.string().trim().min(1)),
  images: z.array(z.string().trim().url("Must be a valid image URL")),
});

export type PropertyInput = z.infer<typeof propertySchema>;
