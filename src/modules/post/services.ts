import { UnauthorizedError } from "../../errors";
import { createPostSchema } from "../../schemas/posts";
import { CreatePostInput } from "../../types/posts";
import { AuthPayload } from "../../types/users";
import { postsReposityory } from "./repositories";

export const createPostService = async (
  user: AuthPayload,
  post: CreatePostInput,
) => {
  const input = createPostSchema
    .omit({
      authorId: true,
    })
    .parse(post);

  if (!user) {
    throw new UnauthorizedError("Missing credentials");
  }
  const newPost = await postsReposityory().createPost({
    ...input,
    authorId: user.sub,
  });

  return newPost;
};
