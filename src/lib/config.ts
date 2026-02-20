import * as dotenv from "dotenv";

dotenv.config();

type Config = {
  dbURL: string;
  secret: string;
  port: string;
};

export const config: Config = {
  dbURL: process.env.DATABASE_URL!,
  secret: process.env.SECRET!,
  port: process.env.PORT!,
};
