import { DrizzleLibSQLDatabase } from "@heximon/drizzle/libsql";
import type { DatabaseRelations, DatabaseSchema } from "./database.config";

// The app's concrete database — a NAMED subclass typed against this app's schema, and the DI token every
// consumer injects (class identity is the only token; the generic base's type arguments are erased). The
// body is empty: it inherits the `(config, context)` constructor unchanged.
export class AppDatabase extends DrizzleLibSQLDatabase<DatabaseSchema, DatabaseRelations> {}
