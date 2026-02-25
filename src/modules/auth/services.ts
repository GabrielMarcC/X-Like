import { UnauthorizedError } from "../../errors";
import { createJWT, validatePassword } from "../../lib/auth";
import { config } from "../../lib/config";
import { EXPIRATION_TOKEN_TIME } from "../../lib/constants/hour";
import { LoginInput } from "../../types/auth";
import { usersRepository } from "../user/repositories";

export const loginAuthService = async (user: LoginInput) => {
  const findedUser = await usersRepository.findUserByEmail(user.email);

  if (!findedUser) {
    throw new UnauthorizedError("Invalid credentials");
  }

  const isValidPassword = await validatePassword(
    findedUser.password,
    user.password,
  );

  if (!isValidPassword) {
    throw new UnauthorizedError("Invalid credentials");
  }

  const token = createJWT(
    findedUser.id,
    findedUser.role!,
    config.secret,
    EXPIRATION_TOKEN_TIME,
  );

  return { token };
};
