import { eq } from "drizzle-orm";
import { db } from "../../db";
import { users } from "../../db/schema";
import {
  createUserInput,
  DeleteUserInput,
  UpdateUserInput,
} from "../../types/users";

export const usersRepository = {
  createUser: async (input: createUserInput) => {
    const [result] = await db.insert(users).values(input).returning({
      id: users.id,
      name: users.name,
      email: users.email,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
      role: users.role,
    });

    return result;
  },

  findUserByEmail: async (email: string) => {
    const result = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    });

    if (!result) return null;

    return result;
  },

  findUserById: async (userId: string) => {
    const result = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, userId),
    });

    if (!result) return null;

    return result;
  },

  updateUser: async (user: UpdateUserInput) => {
    const [result] = await db
      .update(users)
      .set(user)
      .where(eq(users.id, user.id!))
      .returning({
        id: users.id,
      });

    if (!result) return null;

    return result;
  },

  deleteUser: async (user: DeleteUserInput) => {
    const [result] = await db
      .delete(users)
      .where(eq(users.id, user.id))
      .returning({
        id: users.id,
      });

    if (!result) return null;

    return result;
  },
};
