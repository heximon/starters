import type { Controller, Get, Post } from "@heximon/http";
import { NotFoundError } from "@heximon/runtime/errors";
import { CreateUser } from "./user.schema";
import { type User, UsersRepository } from "./users.repository";

// Routes are declared by each handler's action parameter type — the compiler reads `Get<"/">`,
// `Post<"/", { body }>` off the signatures and builds the route table. Constructor parameters are the
// dependency declaration: `UsersRepository` is resolved by its class identity, no token, no decorator.
export class UsersController implements Controller<"/users"> {
  constructor(private readonly users: UsersRepository) {}

  public async list(_action: Get<"/">): Promise<User[]> {
    return this.users.list();
  }

  // A thrown `NotFoundError` renders as a `404 application/problem+json` response. `pathParams.id` is
  // typed as a string from the `"/:id"` literal.
  public async get(action: Get<"/:id">): Promise<User> {
    const user = await this.users.findById(action.request.pathParams.id);
    if (user === undefined) throw new NotFoundError("User not found");
    return user;
  }

  // The body is validated against `CreateUser` before this handler runs — `readValidatedBody()` returns
  // the parsed, typed result; an invalid body never reaches this code.
  public async create(action: Post<"/", { body: CreateUser }>): Promise<User> {
    const body = await action.request.readValidatedBody();
    action.response.status = 201;

    return this.users.create(body.name);
  }
}
