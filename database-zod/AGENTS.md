# Agent instructions — Heximon app

This is a [Heximon](https://heximon.dev) app: a TypeScript backend framework with **compile-time
dependency injection**. If you know NestJS/Angular-style DI, most of that intuition is wrong here and the
wrong version often compiles clean — **read the Heximon skill before writing code**.

- Skill: `.agents/skills/heximon/SKILL.md` — `.claude/skills` is a symlink onto the same install.
  Installed by `heximon create`; install or update any time with `npx skills add https://heximon.dev`.

## The rules that differ from your priors

- **No decorators, no runtime DI container.** A class becomes a route/handler by (1) declaring a concept
  base — `extends Controller<"/users">`, `implements EventHandler<OrderCreated>` — and (2) being listed
  under that plugin's namespace key in its module's config: `http: { controllers: [UsersController] }`.
  Both are required; a handler placed in `providers` instead of its namespace compiles clean and never
  fires.
- **Constructor parameter types are the dependency declaration.** No `@Inject`, no tokens:
  `constructor(private readonly users: UsersRepository) {}`.
- **Binding is explicit-only, by class identity.** `providers: [SqliteUsers]` binds `SqliteUsers` alone;
  injecting an abstract base it extends needs `{ provide: UsersStore, useClass: SqliteUsers }`.
- **The compiler does not type-check** — `pnpm check` does. Run it after every change.

## Commands

```bash
pnpm check   # format, lint, and type-check — run after every edit
pnpm test    # Vitest; boot the app in-process with `await using app = await createTestApp()`
pnpm dev     # compile + serve with hot reload (http://localhost:3000)
pnpm build   # emit a standalone server into dist/
```
