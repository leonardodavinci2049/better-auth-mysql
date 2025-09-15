// Next.js automaticamente carrega variáveis do .env
// Não precisamos mais do dotenv/config

import { z } from "zod";

const envsSchema = z.object({
  BETTER_AUTH_SECRET: z.string().min(1, "BETTER_AUTH_SECRET is required"),
  BETTER_AUTH_URL: z.string().url("BETTER_AUTH_URL must be a valid URL"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  DB_MYSQL_HOST: z.string().min(1, "DB_MYSQL_HOST is required"),
  DB_MYSQL_PORT: z.coerce
    .number()
    .positive("DB_MYSQL_PORT must be a positive number"),
  DB_MYSQL_USER: z.string().min(1, "DB_MYSQL_USER is required"),
  DB_MYSQL_PASSWORD: z.string().min(1, "DB_MYSQL_PASSWORD is required"),
  DB_MYSQL_DATABASE: z.string().min(1, "DB_MYSQL_DATABASE is required"),
});

// Inferir o tipo automaticamente a partir do schema
type EnvVars = z.infer<typeof envsSchema>;

// ✅ Só executar validação no servidor, nunca no cliente
let envVars: EnvVars;

if (typeof window === "undefined") {
  // Estamos no servidor - fazer validação completa
  const validationResult = envsSchema.safeParse(process.env);

  if (!validationResult.success) {
    const errorMessages = validationResult.error.issues
      .map((err) => `${err.path.join(".")}: ${err.message}`)
      .join("\n");
    throw new Error(`❌ Invalid environment variables:\n${errorMessages}`);
  }

  envVars = validationResult.data;
} else {
  // Estamos no cliente - usar valores vazios ou default
  // Estas variáveis NÃO devem ser acessadas no cliente!
  envVars = {
    BETTER_AUTH_SECRET: "",
    BETTER_AUTH_URL: "",
    DATABASE_URL: "",
    DB_MYSQL_HOST: "",
    DB_MYSQL_PORT: 0,
    DB_MYSQL_USER: "",
    DB_MYSQL_PASSWORD: "",
    DB_MYSQL_DATABASE: "",
  };
}

export const envs = {
  BETTER_AUTH_SECRET: envVars.BETTER_AUTH_SECRET,
  BETTER_AUTH_URL: envVars.BETTER_AUTH_URL,
  DATABASE_URL: envVars.DATABASE_URL,

  DB_MYSQL_HOST: envVars.DB_MYSQL_HOST,
  DB_MYSQL_PORT: envVars.DB_MYSQL_PORT,
  DB_MYSQL_USER: envVars.DB_MYSQL_USER,
  DB_MYSQL_PASSWORD: envVars.DB_MYSQL_PASSWORD,
  DB_MYSQL_DATABASE: envVars.DB_MYSQL_DATABASE,
};
