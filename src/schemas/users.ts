import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { users } from "../db/schema";

export const createUserSchema = createInsertSchema(users).omit({
  role: true,
});

export const updateUserSchema = createUpdateSchema(users);
