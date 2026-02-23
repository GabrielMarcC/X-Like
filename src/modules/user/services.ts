import { BadRequestError } from "../../errors";
import { hashPassword } from "../../lib/auth";
import { createUserSchema } from "../../schemas/users";
import { createUserInput } from "../../types/users";
import { usersRepository } from "./repositories";

export const createUserService = async (user: createUserInput) => {
  const input = createUserSchema.parse(user);

  const findedUser = await usersRepository().findUserByEmail(input.email);

  if (findedUser) {
    throw new BadRequestError("Email already in use");
  }

  const hash = await hashPassword(input.password);

  const response = await usersRepository().createUser({
    ...input,
    password: hash,
  });

  return response;
};
