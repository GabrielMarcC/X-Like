import { ZodError } from "zod";

export const formatZodError = (error: ZodError) => {
  const formattedErrors: Record<string, string> = {};

  for (const issue of error.issues) {
    const field = issue.path.join(".");
    formattedErrors[field] = issue.message;
  }

  return formattedErrors;
};
