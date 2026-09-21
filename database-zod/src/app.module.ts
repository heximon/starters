import { Module } from "@heximon/runtime";
import { TasksModule } from "./tasks/tasks.module";

// The root module — auto-discovered as the app's entry. Feature modules are composed via `imports`.
export class AppModule extends Module({
  imports: [TasksModule],
}) {}
