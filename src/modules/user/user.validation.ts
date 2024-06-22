import { z } from "zod";

const createZodUserValidation = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  phone: z.string(),
  address: z.string(),
  role: z.string(),
});
const updateZodUserValidation = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  password: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  role: z.string().optional(),
});

export const UserValidation = {
  createZodUserValidation,
  updateZodUserValidation,
};
