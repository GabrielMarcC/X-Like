import { NextFunction, Request, Response } from "express";
import { getBearerToken, validateJWT } from "../lib/auth";
import { config } from "../lib/config";
import { AuthPayload } from "../types/users";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = getBearerToken(req);

  const payload = validateJWT(token, config.secret);

  req.user = payload as AuthPayload;

  next();
};
