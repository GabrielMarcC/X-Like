import express from "express";
import cors from "cors";
import { config } from "./lib/config";
import { usersRoutes } from "./modules/user/routes";
import { authRoutes } from "./modules/auth/routes";
import { globalErrorMiddleware } from "./middlewares/error";
import { postsRoutes } from "./modules/post/routes";

const app = express();
const port = config.port;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postsRoutes);

app.use(globalErrorMiddleware);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
