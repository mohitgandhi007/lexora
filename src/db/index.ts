import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
import { config } from "dotenv";
import * as schema from "./schema.js";

config();

const { Pool } = pkg;

const connectionString = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/lexora";

const pool = new Pool({
  connectionString,
});

export const db = drizzle(pool, { schema });
