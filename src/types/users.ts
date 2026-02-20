import z from "zod";
import { createUserSchema } from "../schemas/users";

export type createUserInput = z.infer<typeof createUserSchema>;
