import { and, desc, eq } from "drizzle-orm";
import { db } from "../../db";
import { posts, users } from "../../db/schema";
import { InsertPost, UpdatePostInput } from "../../types/posts";
import { PaginationInput } from "../../types/params";
import { PER_PAGE } from "../../lib/constants/pagination";

export const postsReposityory = {
  createPost: async (post: InsertPost) => {
    const [result] = await db.insert(posts).values(post).returning({
      id: posts.id,
    });

    if (!result) return null;

    return result;
  },

  getPost: async (postId: string) => {
    const result = await db.query.posts.findFirst({
      where: (posts, { eq }) => eq(posts.id, postId),
    });

    if (!result) return null;

    return result;
  },

  getAllPosts: async ({
    orderBy = "asc",
    page = 1,
    perPage = PER_PAGE,
  }: PaginationInput) => {
    const result = await db.query.posts.findMany({
      orderBy: (posts, { asc }) =>
        orderBy === "asc" ? asc(posts.createdAt) : desc(posts.createdAt),
      limit: perPage,
      offset: (page - 1) * perPage,
    });

    if (!result) return [];

    return result;
  },

  updatePost: async (post: UpdatePostInput) => {
    const [result] = await db
      .update(posts)
      .set(post)
      .where(and(eq(posts.authorId, post.authorId!), eq(posts.id, post.id!)))
      .returning({
        id: posts.id,
      });

    if (!result) return null;

    return result;
  },

  deletePost: async (userId: string, postId: string) => {
    const [result] = await db
      .delete(posts)
      .where(and(eq(posts.authorId, userId), eq(posts.id, postId)))
      .returning({
        id: posts.id,
      });

    if (!result) return null;

    return result;
  },
};
