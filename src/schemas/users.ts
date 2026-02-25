import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { users } from "../db/schema";
import z from "zod";

export const createUserSchema = createInsertSchema(users).omit({
  role: true,
});

export const updateUserSchema = createUpdateSchema(users)
  .extend({
    name: z.string().min(3).optional(),
    password: z.string().min(8).optional(),
  })
  .omit({
    role: true,
  })
  .refine((obj) => Object.keys(obj).length > 0, {
    error: "At least one field must be provided",
  })
  .refine((obj) => Object.keys(obj).length > 0, {
    error: "Missing id",
  });

export const deleteUserSchema = z.object({
  id: z.uuid(),
});
