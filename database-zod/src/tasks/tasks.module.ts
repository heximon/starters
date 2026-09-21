import { Module } from "@heximon/runtime";
import { DatabaseModule } from "../database/database.module";
import { TasksController } from "./tasks.controller";
import { TasksRepository } from "./tasks.repository";

export class TasksModule extends Module({
  imports: [DatabaseModule],
  providers: [TasksRepository],
  http: { controllers: [TasksController] },
  exports: [TasksRepository],
}) {}
