import express from "express";
import cors from "cors";
import { config } from "./lib/config";
import { usersRoutes } from "./modules/user/routes";

const app = express();
const port = config.port;

app.use(cors());
app.use(express.json());

app.use("/api/users", usersRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
