import { Request, Response } from "express";
import { createPostService } from "./services";
import { CreatePostInput } from "../../types/posts";

export const handlerCreatePost = async (req: Request, res: Response) => {
  const body: CreatePostInput = req.body;

  const post = await createPostService(req.user!, body);

  res.status(200).send(post);
};
