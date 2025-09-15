import { defineConfig } from "drizzle-kit";
import { envs } from "./src/core/config/envs";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: envs.DATABASE_URL,
  },
});
