import z from "zod";
import { createUserSchema } from "../schemas/users";

export type createUserInput = z.infer<typeof createUserSchema>;

export type UpdateUserInput = z.infer<typeof createUserSchema>;

export type AuthPayload = {
  sub: string;
  role: "user" | "admin";
  expiresIn: string;
};
