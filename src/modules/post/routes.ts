import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth";
import { handlerCreatePost } from "./controllers";

const router = Router();

router.post("/", authMiddleware, handlerCreatePost);

export const postsRoutes = router;
