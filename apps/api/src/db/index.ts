import { drizzle } from "drizzle-orm/node-postgres";
import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import pkg from "pg";
import { config } from "dotenv";
import * as schema from "./schema.js";

config();

const { Pool } = pkg;

const connectionString = process.env.DATABASE_URL;

let pool: any = null;
let drizzleDb: NodePgDatabase<typeof schema> | null = null;
let isConnected = false;

if (connectionString) {
  try {
    const isNeon = connectionString.includes("neon.tech") || connectionString.includes("sslmode=require");
    pool = new Pool({
      connectionString,
      ssl: isNeon ? { rejectUnauthorized: false } : undefined,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });

    drizzleDb = drizzle(pool, { schema });
    pool.query("SELECT 1")
      .then(() => {
        isConnected = true;
        console.log("⚡ [Neon Postgres] Connected successfully with Drizzle ORM.");
      })
      .catch((err: any) => {
        console.warn("⚠️ [Neon Postgres] Connection check failed, running in fallback mode:", err.message);
      });
  } catch (err: any) {
    console.warn("⚠️ [Neon Postgres] Initialization error:", err.message);
  }
} else {
  console.log("ℹ️ [Database] DATABASE_URL not set, operating in simulated Neon storage mode.");
}

export const db = drizzleDb;
export const getDbStatus = () => ({
  connected: isConnected,
  hasConnectionString: Boolean(connectionString),
  type: connectionString ? (connectionString.includes("neon.tech") ? "Neon Serverless Postgres" : "PostgreSQL") : "Local Resilient Store",
});
