import z from "zod";
import { PER_PAGE } from "../lib/constants/pagination";

export const validateIdSchema = z.object({
  id: z.uuid("Invalid uuid"),
});

export const validatePaginationQueryParams = z.object({
  orderBy: z.enum(["asc", "desc"]).optional(),
  perPage: z.coerce.number().min(1).default(PER_PAGE).optional(),
  offset: z.coerce.number().min(1).optional(),
  page: z.coerce.number().default(1).optional(),
});
