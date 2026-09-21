import type { Controller, Delete, Get, Patch, Post } from "@heximon/http";
import { NotFoundError, ValidationError } from "@heximon/runtime/errors";
import { type Task, TasksRepository } from "./tasks.repository";

interface CreateTaskBody {
  readonly title?: unknown;
}

interface SetDoneBody {
  readonly done?: unknown;
}

// Routes are declared by each handler's action parameter type — the compiler reads `Get<"/">`,
// `Post<"/">`, … off the signatures and builds the route table. The controller only translates between
// HTTP and the repository: parsing the request, choosing a status code, shaping the JSON response.
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

  public async create(action: Post<"/">): Promise<Task> {
    const body = (await action.request.json()) as CreateTaskBody;

    if (typeof body.title !== "string" || body.title.trim().length === 0) {
      throw new ValidationError({ message: "A non-empty 'title' string is required." });
    }

    action.response.status = 201;

    return this.tasks.create(body.title.trim());
  }

  public async setDone(action: Patch<"/:id">): Promise<Task> {
    const id = Number(action.request.pathParams.id);
    const body = (await action.request.json()) as SetDoneBody;
    const updated = await this.tasks.setDone(id, body.done === true);

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
