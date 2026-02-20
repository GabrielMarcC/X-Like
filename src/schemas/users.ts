import { createInsertSchema } from "drizzle-zod";
import { users } from "../db/schema";

export const createUserSchema = createInsertSchema(users);
