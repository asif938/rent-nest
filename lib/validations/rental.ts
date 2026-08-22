import { z } from "zod";

export const rentalRequestSchema = z
  .object({
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().min(1, "End date is required"),
  })
  .refine(
    (data) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return new Date(data.startDate) >= today;
    },
    {
      message: "Start date cannot be in the past",
      path: ["startDate"],
    }
  )
  .refine(
    (data) => new Date(data.endDate) > new Date(data.startDate),
    {
      message: "End date must be after start date",
      path: ["endDate"],
    }
  );

export type RentalRequestInput = z.infer<typeof rentalRequestSchema>;
