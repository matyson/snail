import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import * as schema from "./schema";
// import { migrate } from "drizzle-orm/bun-sqlite/migrator";
// import { sampleJobs } from "./sample";

const sqlite = new Database("jobs.db");
export const db = drizzle(sqlite, { schema });

// migrate the database
// await migrate(db, { migrationsFolder: "drizzle" });

// insert sample data
// await db.insert(jobs).values(sampleJobs);
