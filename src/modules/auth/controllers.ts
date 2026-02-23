import { Request, Response } from "express";
import { loginAuthService } from "./services";
import { LoginInput } from "../../types/auth";

export const handlerLogin = async (req: Request, res: Response) => {
  const body: LoginInput = req.body;

  const result = await loginAuthService(body);

  res.status(200).send(result);
};
