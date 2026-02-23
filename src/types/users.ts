import z from "zod";
import { createUserSchema, updateUserSchema } from "../schemas/users";

export type createUserInput = z.infer<typeof createUserSchema>;

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export type AuthPayload = {
  sub: string;
  role: "user" | "admin";
  expiresIn: string;
};
