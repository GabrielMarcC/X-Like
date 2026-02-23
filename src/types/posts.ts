import z from "zod";
import { createPostSchema, rawPostSchema } from "../schemas/posts";

export type RawPost = z.infer<typeof rawPostSchema>;
export type CreatePostInput = z.infer<typeof createPostSchema>;
