import { createTestClient } from "@heximon/http/testing";
import { createTestApp, type TestApp } from "@heximon/testing";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, expect, test } from "vitest";

// An in-process end-to-end test: createTestApp compiles src/ (the exact pipeline `pnpm dev` runs) and
// boots a fresh isolated app; createTestClient drives real requests through the generated routes.
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

let app: TestApp;

beforeAll(async () => {
  app = await createTestApp({ root });
});

afterAll(() => app[Symbol.asyncDispose]());

test("creates a task and reads it back", async () => {
  const client = createTestClient(app);

  const created = await client.request(
    new Request("http://localhost/tasks", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title: "Write docs" }),
    }),
  );
  expect(created.status).toBe(201);
  const task = (await created.json()) as { id: number; title: string; done: boolean };
  expect(task.title).toBe("Write docs");
  expect(task.done).toBe(false);

  const list = await client.request(new Request("http://localhost/tasks"));
  expect(await list.json()).toEqual([task]);
});

test("rejects a create without a title", async () => {
  const client = createTestClient(app);

  const response = await client.request(
    new Request("http://localhost/tasks", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({}),
    }),
  );

  expect(response.status).toBe(400);
});
