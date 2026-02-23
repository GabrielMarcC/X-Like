import { Request, Response, NextFunction } from "express";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

export const globalErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);
  const status = err.statusCode || err.status || 500;

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
