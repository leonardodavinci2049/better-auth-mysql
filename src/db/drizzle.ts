import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

// ✅ Usar process.env diretamente no servidor para evitar problemas no cliente
// A validação e inicialização só acontece quando realmente necessário
let _db: ReturnType<typeof drizzle> | null = null;

function initDb() {
  if (typeof window !== "undefined") {
    throw new Error("Database should only be accessed on the server side");
  }

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  if (!_db) {
    const sql = neon(process.env.DATABASE_URL);
    _db = drizzle(sql);
  }

  return _db;
}

export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(target, prop) {
    const dbInstance = initDb();
    return dbInstance[prop as keyof typeof dbInstance];
  },
});
