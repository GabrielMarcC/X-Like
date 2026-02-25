import { BadRequestError, NotFoundError } from "../../errors";
import { hashPassword } from "../../lib/auth";
import {
  createUserInput,
  DeleteUserInput,
  UpdateUserInput,
} from "../../types/users";
import { usersRepository } from "./repositories";

export const createUserService = async (user: createUserInput) => {
  const foundUser = await usersRepository.findUserByEmail(user.email);

  if (foundUser) {
    throw new BadRequestError("Email already in use");
  }

  const hash = await hashPassword(user.password);

  const response = await usersRepository.createUser({
    ...user,
    password: hash,
  });

  return response;
};

export const updateUserService = async (
  user: UpdateUserInput,
  userId: string,
) => {
  const foundUser = await usersRepository.findUserById(userId);

  if (!foundUser) {
    throw new NotFoundError("User not found");
  }

  const passwordHash = user.password
    ? await hashPassword(user.password)
    : undefined;

  const response = await usersRepository.updateUser({
    ...user,
    id: foundUser.id,
    password: passwordHash,
  });

  return response;
};

export const deleteUserService = async (user: DeleteUserInput) => {
  const response = await usersRepository.deleteUser({
    id: user.id,
  });

  if (!response) {
    throw new NotFoundError("User not found");
  }

  return response;
};
