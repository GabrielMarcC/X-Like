import z from "zod";
import { validatePaginationQueryParams } from "../schemas/params";

export type PaginationInput = z.infer<typeof validatePaginationQueryParams>;
