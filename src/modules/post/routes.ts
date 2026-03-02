import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth";
import {
  handlerCreatePost,
  handlerDeletePost,
  handlerGetAllPosts,
  handlerGetPost,
  handlerUpdatePost,
} from "./controllers";

const router = Router();

router.get("/:id", authMiddleware, handlerGetPost);
router.get("/", handlerGetAllPosts);
router.post("/", handlerCreatePost);
router.put("/:id", authMiddleware, handlerUpdatePost);
router.delete("/:id", authMiddleware, handlerDeletePost);

export const postsRoutes = router;
