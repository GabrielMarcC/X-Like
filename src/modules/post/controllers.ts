import { Request, Response } from "express";
import {
  createPostService,
  deletePostService,
  getAllPostsService,
  getPostService,
  updatePostService,
} from "./services";
import { CreatePostInput, UpdatePostInput } from "../../types/posts";
import { createPostSchema, updatePostSchema } from "../../schemas/posts";
import {
  validateIdSchema,
  validatePaginationQueryParams,
} from "../../schemas/params";

export const handlerCreatePost = async (req: Request, res: Response) => {
  const body: CreatePostInput = req.body;
  const input = createPostSchema.parse(body);

  const id = await createPostService({ ...input, authorId: req.user?.sub });

  res.status(200).send(id);
};

export const handlerGetPost = async (req: Request, res: Response) => {
  const params = req.params;
  const { id } = validateIdSchema.parse(params);

  const post = await getPostService(id);

  res.status(200).send(post);
};

export const handlerGetAllPosts = async (req: Request, res: Response) => {
  const queries = req.query;

  const query = validatePaginationQueryParams.parse(queries);

  const posts = await getAllPostsService(query);

  res.status(200).send(posts);
};

export const handlerUpdatePost = async (req: Request, res: Response) => {
  const body: UpdatePostInput = req.body;
  const params = req.params;
  const input = updatePostSchema.parse(body);
  const { id } = validateIdSchema.parse(params);

  const postId = await updatePostService({
    ...input,
    id,
    authorId: req.user.sub,
  });

  res.status(200).send(postId);
};

export const handlerDeletePost = async (req: Request, res: Response) => {
  const params = req.params;
  const { id } = validateIdSchema.parse(params);

  const postId = await deletePostService(req.user.sub, id);

  res.status(200).send(postId);
};
