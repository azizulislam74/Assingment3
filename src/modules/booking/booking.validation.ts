import { z } from "zod";

export const createZodBookingValidation = z.object({
  bikeId: z.string().nonempty("Bike id is required"),
  startTime: z.string().nonempty("Start time is required"),
});

export const updateZodBookingValidation = z.object({
  returnTime: z.string().optional(),
  totalCost: z.number().positive().optional(),
  isReturned: z.boolean().optional(),
});

export const BookingValidation = {
  createZodBookingValidation,
  updateZodBookingValidation,
};
