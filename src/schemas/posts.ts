import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import { posts } from "../db/schema";

export const rawPostSchema = createSelectSchema(posts);
export const insertPostSchema = createInsertSchema(posts);
export const createPostSchema = createInsertSchema(posts).omit({
  authorId: true,
});
export const updatePostSchema = createUpdateSchema(posts);
