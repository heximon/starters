import { type Context, Module } from "@heximon/runtime";
import { AppDatabase } from "./app-database";
import { databaseConfig } from "./database.config";

// Owns the single AppDatabase connection and exports it so any importing module can inject it by class
// identity. There is no Drizzle compiler plugin — the database is an ordinary `useFactory` provider whose
// one parameter (`Context`) resolves by its type, like any constructor dependency. The config is a
// closed-over value, never a DI token.
export class DatabaseModule extends Module({
  providers: [
    {
      provide: AppDatabase,
      useFactory: (context: Context) => new AppDatabase(databaseConfig, context),
    },
  ],
  exports: [AppDatabase],
}) {}
