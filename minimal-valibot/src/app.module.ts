import { Module } from "@heximon/runtime";
import { UsersModule } from "./users/users.module";

// The root module — auto-discovered as the app's entry. Feature modules are composed via `imports`.
export class AppModule extends Module({
  imports: [UsersModule],
}) {}
