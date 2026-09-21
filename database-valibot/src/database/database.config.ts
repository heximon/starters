import { DrizzleLibSQLConfig } from "@heximon/drizzle/libsql/config";
import { relations, schema } from "./schema";

// The unified database config — authored once, read by two consumers: the runtime (the database is built
// from it) and the stock drizzle-kit CLI (the same instance is a valid drizzle-kit Config, so
// `drizzle-kit --config src/database/database.config.ts` works with no second config file).
//
// `url: ":memory:"` is an in-process SQLite database (fresh on every boot). Swap it for `file:./app.db`
// to persist between runs, or a `libsql://…` Turso URL (plus an authToken) for a hosted database.
export const databaseConfig = new DrizzleLibSQLConfig(schema, relations, {
  dialect: "sqlite",
  schema: "./src/database/schema.ts",
  out: "./migrations",
  url: ":memory:",
});

export type DatabaseSchema = typeof schema;
export type DatabaseRelations = typeof relations;
