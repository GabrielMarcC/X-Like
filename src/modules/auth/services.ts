import { UnauthorizedError } from "../../errors";
import { createJWT, validatePassword } from "../../lib/auth";
import { config } from "../../lib/config";
import { loginSchema } from "../../schemas/auth";
import { LoginInput } from "../../types/auth";
import { usersRepository } from "../user/repositories";

export const loginAuthService = async (user: LoginInput) => {
  const input = loginSchema.parse(user);

  const findedUser = await usersRepository().findUserByEmail(input.email);

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

  const jwt = createJWT(findedUser.id, findedUser.role!, config.secret);

  return { token: jwt };
};
