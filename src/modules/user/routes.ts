import { Router } from "express";
import { handlerCreateUser } from "./controllers";

const router = Router();

router.post("/", handlerCreateUser);

export const usersRoutes = router;
