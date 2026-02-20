import { db } from "../../db";
import { users } from "../../db/schema";
import { createUserInput } from "../../types/users";

export const usersRepository = () => {
  const createUser = async (input: createUserInput) => {
    const [result] = await db.insert(users).values(input).returning({
      id: users.id,
      name: users.name,
      email: users.email,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
      role: users.role,
    });

    return result;
  };

  const findUserByEmail = async (email: string) => {
    const result = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });

    return result;
  };

  return { createUser, findUserByEmail };
};
