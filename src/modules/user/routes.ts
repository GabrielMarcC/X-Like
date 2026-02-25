import { Router } from "express";
import {
  handlerCreateUser,
  handlerUpdateUser,
  hanlderDeleteUser,
} from "./controllers";
import { authMiddleware } from "../../middlewares/auth";

const router = Router();

router.post("/", handlerCreateUser);
router.patch("/:id", authMiddleware, handlerUpdateUser);
router.delete("/:id", authMiddleware, hanlderDeleteUser);

export const usersRoutes = router;
