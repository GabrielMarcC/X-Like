import { Request } from "express";
import { UnauthorizedError } from "../errors";
import jwt from "jsonwebtoken";
import * as argon2 from "argon2";

export const createJWT = (
  userId: string,
  role: "user" | "admin",
  secret: string,
  expiresIn: number,
) => {
  const token = jwt.sign(
    {
      sub: userId,
      role,
    },
    secret,
    {
      expiresIn: expiresIn ?? 6 * 3600,
    },
  );
  return token;
};

export const validateJWT = (token: string, secret: string) => {
  const result = jwt.verify(token, secret);

  return result;
};

export const getBearerToken = (req: Request) => {
  const header = req.get("authorization");

  const parts = header?.split(" ");

  if (header?.length === 0) {
    throw new UnauthorizedError("Missing token");
  }

  const isInvalid = !parts || parts[0] !== "Bearer" || parts[1].length === 0;

  if (isInvalid) {
    throw new UnauthorizedError("Invalid token");
  }

  return parts[1];
};

export const hashPassword = async (password: string) => {
  const hash = await argon2.hash(password);
  return hash;
};

export const validatePassword = async (hash: string, password: string) => {
  const result = await argon2.verify(hash, password);

  return result;
};
