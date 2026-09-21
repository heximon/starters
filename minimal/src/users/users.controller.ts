import type { Controller, Get } from "@heximon/http";
import { NotFoundError } from "@heximon/runtime/errors";
import { type User, UsersRepository } from "./users.repository";

// Routes are declared by each handler's action parameter type — the compiler reads `Get<"/">` and
// `Get<"/:id">` off the signatures and builds the route table. Constructor parameters are the dependency
// declaration: `UsersRepository` is resolved by its class identity, no token, no decorator.
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
}
