import type { Controller, Delete, Get, Patch, Post } from "@heximon/http";
import { NotFoundError } from "@heximon/runtime/errors";
import { CreateTask, SetDone } from "./task.schema";
import { type Task, TasksRepository } from "./tasks.repository";

// Routes are declared by each handler's action parameter type — the compiler reads `Get<"/">`,
// `Post<"/", { body }>`, … off the signatures and builds the route table. Declared bodies are validated
// before the handler runs; `readValidatedBody()` returns the parsed, typed result.
export class TasksController implements Controller<"/tasks"> {
  public constructor(private readonly tasks: TasksRepository) {}

  public async list(_action: Get<"/">): Promise<Task[]> {
    return this.tasks.list();
  }

  public async get(action: Get<"/:id">): Promise<Task> {
    const id = Number(action.request.pathParams.id);
    const task = await this.tasks.findById(id);

    if (task === undefined) {
      throw new NotFoundError(`No task with id ${id}.`);
    }

    return task;
  }

  public async create(action: Post<"/", { body: CreateTask }>): Promise<Task> {
    const body = await action.request.readValidatedBody();
    action.response.status = 201;

    return this.tasks.create(body.title);
  }

  public async setDone(action: Patch<"/:id", { body: SetDone }>): Promise<Task> {
    const id = Number(action.request.pathParams.id);
    const body = await action.request.readValidatedBody();
    const updated = await this.tasks.setDone(id, body.done);

    if (updated === undefined) {
      throw new NotFoundError(`No task with id ${id}.`);
    }

    return updated;
  }

  public async remove(action: Delete<"/:id">): Promise<{ deleted: number }> {
    const id = Number(action.request.pathParams.id);
    const removed = await this.tasks.remove(id);

    if (!removed) {
      throw new NotFoundError(`No task with id ${id}.`);
    }

    return { deleted: id };
  }
}
