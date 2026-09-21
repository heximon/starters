import { type OnInit } from "@heximon/runtime";
import { eq, sql } from "drizzle-orm";
import { AppDatabase } from "../database/app-database";
import { tasks, type TaskRow } from "../database/schema";

/** A task as the rest of the app sees it — `done` is a real boolean (the row stores it as 0/1). */
export interface Task {
  readonly id: number;
  readonly title: string;
  readonly done: boolean;
}

// The data-access service: depends on the single shared AppDatabase (resolved by class identity) and runs
// all persistence through the typed Drizzle ORM. The in-memory database starts empty on every boot, so the
// table is created in onInit — a file-backed or remote database would use a migration instead.
export class TasksRepository implements OnInit {
  public constructor(private readonly database: AppDatabase) {}

  public async onInit(): Promise<void> {
    await this.database.getOrm().run(sql`
      CREATE TABLE IF NOT EXISTS tasks (
        id    INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        done  INTEGER NOT NULL DEFAULT 0
      )
    `);
  }

  public async list(): Promise<Task[]> {
    const rows = await this.database.getOrm().select().from(tasks).orderBy(tasks.id);

    return rows.map((row) => TasksRepository.toTask(row));
  }

  public async findById(id: number): Promise<Task | undefined> {
    const rows = await this.database.getOrm().select().from(tasks).where(eq(tasks.id, id)).limit(1);
    const row = rows[0];

    return row === undefined ? undefined : TasksRepository.toTask(row);
  }

  public async create(title: string): Promise<Task> {
    const [row] = await this.database.getOrm().insert(tasks).values({ title, done: 0 }).returning();

    if (row === undefined) {
      throw new Error("Insert returned no row.");
    }

    return TasksRepository.toTask(row);
  }

  public async setDone(id: number, done: boolean): Promise<Task | undefined> {
    const [row] = await this.database
      .getOrm()
      .update(tasks)
      .set({ done: done ? 1 : 0 })
      .where(eq(tasks.id, id))
      .returning();

    return row === undefined ? undefined : TasksRepository.toTask(row);
  }

  public async remove(id: number): Promise<boolean> {
    const deleted = await this.database.getOrm().delete(tasks).where(eq(tasks.id, id)).returning();

    return deleted.length > 0;
  }

  private static toTask(row: TaskRow): Task {
    return { id: row.id, title: row.title, done: row.done === 1 };
  }
}
