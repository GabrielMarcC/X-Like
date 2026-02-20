import { NextFunction, Request, Response } from "express";
import { createUserService } from "./services";
import { createUserInput } from "../../types/users";

export const handlerCreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const body: createUserInput = req.body;

    const user = await createUserService(body);

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};
