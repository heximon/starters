import { Module } from "@heximon/runtime";
import { UsersController } from "./users.controller";
import { UsersRepository } from "./users.repository";

export class UsersModule extends Module({
  providers: [UsersRepository],
  http: { controllers: [UsersController] },
  exports: [UsersRepository],
}) {}
