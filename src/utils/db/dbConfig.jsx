import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
const sql = neon(
  "postgresql://zerotohero_owner:tG5qacRLS3pI@ep-wandering-dust-a5m6eeg1.us-east-2.aws.neon.tech/zerotohero?sslmode=require"
);
export const db = drizzle(sql, { schema });
