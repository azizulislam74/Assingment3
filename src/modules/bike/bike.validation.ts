import { z } from "zod";

const createZodBikeSchema = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().nonempty("Description is required"),
  pricePerHour: z.number().min(0, "Price per hour must be a positive number"),
  isAvailable: z.boolean().optional().default(true),
  cc: z.number().min(50, "Engine capacity must be at least 50cc"),
  year: z
    .number()
    .min(1900, "Year must be later than 1900")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
  model: z.string().nonempty("Model is required"),
  brand: z.string().nonempty("Brand is required"),
});
const updateZodBikeSchema = z.object({
  name: z.string().nonempty("Name is required").optional(),
  description: z.string().nonempty("Description is required").optional(),
  pricePerHour: z
    .number()
    .min(0, "Price per hour must be a positive number")
    .optional(),
  isAvailable: z.boolean().optional().default(true).optional(),
  cc: z.number().min(50, "Engine capacity must be at least 50cc").optional(),
  year: z
    .number()
    .min(1900, "Year must be later than 1900")
    .max(new Date().getFullYear(), "Year cannot be in the future")
    .optional(),
  model: z.string().nonempty("Model is required").optional(),
  brand: z.string().nonempty("Brand is required").optional(),
});

// Use the Zod schema for validation
export const BikeValidation = {
  createZodBikeSchema,
  updateZodBikeSchema,
};
