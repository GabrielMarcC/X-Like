import { Request, Response } from "express";
import { createUserService } from "./services";
import { createUserInput } from "../../types/users";

export const handlerCreateUser = async (req: Request, res: Response) => {
  const body: createUserInput = req.body;

  const user = await createUserService(body);

  res.status(200).send(user);
};
