import { Router } from "express";
import { handlerLogin } from "./controllers";

const router = Router();

router.post("/login", handlerLogin);

export const authRoutes = router;
