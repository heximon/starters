import { defineRelations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// The `done` flag is stored as a SQLite integer (0/1) — SQLite has no native boolean; the repository
// maps it to/from JS booleans.
export const tasks = sqliteTable("tasks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  done: integer("done").notNull().default(0),
});

// One canonical schema map both consumers read: the runtime ORM and the stock drizzle-kit CLI.
export const schema = { tasks };

// No relations yet (a single standalone table) — declared so the relational-query surface is well-formed.
export const relations = defineRelations(schema);

export type TaskRow = typeof tasks.$inferSelect;
