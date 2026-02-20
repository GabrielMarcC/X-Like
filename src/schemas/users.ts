import { createInsertSchema } from "drizzle-zod";
import { users } from "../db/schema";

export const createUserSchema = createInsertSchema(users).omit({
  role: true,
});

export const updateUserSchema = createUserSchema.pick({
  name: true,
  email: true,
  password: true,
});
