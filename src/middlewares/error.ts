import { Request, Response, NextFunction } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { ZodError } from "zod";
import { formatZodError } from "../lib/format-error";

export const globalErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const status = err.statusCode || err.status || 500;

  if (err instanceof ZodError) {
    const message = formatZodError(err);

    return res.status(400).json({
      type: "validation_error",
      message: "Invalid request body",
      fields: message,
    });
  }

  if (err instanceof JsonWebTokenError) {
    res.status(401).json({
      error: "Invalid token",
    });
  }

  if (err instanceof TokenExpiredError) {
    res.status(401).json({
      error: "Expired jwt token",
    });
  }

  res.status(status).json({
    error: err.message || "Internal Server Error",
  });
};
