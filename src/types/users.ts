import z from "zod";
import {
  createUserSchema,
  deleteUserSchema,
  updateUserSchema,
} from "../schemas/users";

export type createUserInput = z.infer<typeof createUserSchema>;

export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export type DeleteUserInput = z.infer<typeof deleteUserSchema>;

export type AuthPayload = {
  sub: string;
  role: "user" | "admin";
  iat: number;
  exp: number;
};
