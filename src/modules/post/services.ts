import { ForbiddenError, NotFoundError } from "../../errors";
import { PaginationInput } from "../../types/params";
import { InsertPost, UpdatePostInput } from "../../types/posts";

import { postsReposityory } from "./repositories";

export const createPostService = async (post: InsertPost) => {
  const newPost = await postsReposityory.createPost(post);

  return newPost;
};

export const getPostService = async (postId: string) => {
  const post = await postsReposityory.getPost(postId);

  return post;
};

export const getAllPostsService = async (post: PaginationInput) => {
  const posts = await postsReposityory.getAllPosts(post);

  return posts;
};

export const updatePostService = async (post: UpdatePostInput) => {
  const id = await postsReposityory.updatePost(post);

  return id;
};

export const deletePostService = async (postId: string, userId: string) => {
  const post = await postsReposityory.getPost(postId);

  if (!post) {
    throw new NotFoundError("Post not found");
  }

  if (post.authorId !== userId) {
    throw new ForbiddenError("Missing permission to delete this post");
  }

  const id = await postsReposityory.deletePost(postId, userId);

  return id;
};
