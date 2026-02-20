import "express";
import { AuthPayload } from "./users";

declare module "express-serve-static-core" {
  interface Request {
    user?: AuthPayload;
  }
}
