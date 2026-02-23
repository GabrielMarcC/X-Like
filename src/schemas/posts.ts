import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { posts } from "../db/schema";

export const rawPostSchema = createSelectSchema(posts);
export const createPostSchema = createInsertSchema(posts);
