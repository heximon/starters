import { expect, test } from "vitest";
import { UsersRepository } from "../src/users/users.repository";

test("UsersRepository lists seeded users", async () => {
  const repo = new UsersRepository();
  const users = await repo.list();
  expect(users).toHaveLength(2);
  expect(users[0]?.name).toBe("Alice");
});

test("UsersRepository finds a user by id", async () => {
  const repo = new UsersRepository();
  expect(await repo.findById("2")).toEqual({ id: "2", name: "Bob" });
  expect(await repo.findById("999")).toBeUndefined();
});

test("UsersRepository creates a user with a generated id", async () => {
  const repo = new UsersRepository();
  const created = await repo.create("Carol");
  expect(created.name).toBe("Carol");
  expect(await repo.findById(created.id)).toEqual(created);
});
