import { Request, Response } from "express";
import { loginAuthService } from "./services";
import { LoginInput } from "../../types/auth";
import { loginSchema } from "../../schemas/auth";

export const handlerLogin = async (req: Request, res: Response) => {
  const body: LoginInput = req.body;

  const input = loginSchema.parse(body);

  const result = await loginAuthService(input);

  res.status(200).send(result);
};
