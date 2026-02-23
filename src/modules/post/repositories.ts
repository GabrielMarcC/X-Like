import { db } from "../../db";
import { posts } from "../../db/schema";
import { CreatePostInput } from "../../types/posts";

export const postsReposityory = () => {
  const createPost = async (post: CreatePostInput) => {
    const [result] = await db.insert(posts).values(post).returning();

    return result;
  };

  return { createPost };
};
