import { Request, Response } from "express";
import {
  createUserService,
  deleteUserService,
  updateUserService,
} from "./services";
import { createUserInput, UpdateUserInput } from "../../types/users";
import { createUserSchema, updateUserSchema } from "../../schemas/users";
import { validateIdSchema } from "../../schemas/params";

export const handlerCreateUser = async (req: Request, res: Response) => {
  const body: createUserInput = req.body;

  const input = createUserSchema.parse(body);

  const user = await createUserService(input);

  res.status(200).send(user);
};

export const handlerUpdateUser = async (req: Request, res: Response) => {
  const body: UpdateUserInput = req.body;
  const params = req.params;

  const input = updateUserSchema.parse(body);
  const { id } = validateIdSchema.parse(params);

  const userId = await updateUserService(input, id);

  res.status(200).send(userId);
};

export const hanlderDeleteUser = async (req: Request, res: Response) => {
  const params = req.params;

  const { id } = validateIdSchema.parse(params);

  const userId = await deleteUserService({ id });

  res.status(200).send(userId);
};
