import z from "zod";
import {
  createPostSchema,
  insertPostSchema,
  rawPostSchema,
  updatePostSchema,
} from "../schemas/posts";

export type RawPost = z.infer<typeof rawPostSchema>;
export type CreatePostInput = z.infer<typeof createPostSchema>;
export type InsertPost = z.infer<typeof insertPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
