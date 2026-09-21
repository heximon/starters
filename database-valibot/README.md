# ⏣ My Heximon app

This is a [Heximon](https://github.com/heximon/heximon) backend with real persistence: a tasks CRUD
API on Drizzle ORM and SQLite. Request bodies are checked by valibot, and it needs no database server
to start.

## Run it

```bash
pnpm dev     # http://localhost:3000
pnpm test    # in-process end-to-end tests
pnpm check   # format, lint, and type-check
pnpm build   # emit a standalone server into dist/
```

Before the first run, install the dependencies with `pnpm install` (pnpm 11 or newer). This app ships a
`pnpm-workspace.yaml` that approves one dependency install script: `drizzle-kit` installs esbuild,
and esbuild links its platform binary in an install script. pnpm blocks an unapproved install
script, so keep that file. npm, yarn, and Bun ignore it.

## Project layout

| File or folder       | What it does                                                                     |
| :------------------- | :------------------------------------------------------------------------------- |
| `heximon.config.ts`  | Lists the compiler plugins. Persistence needs no plugin.                         |
| `src/app.module.ts`  | The root module. It imports `TasksModule`.                                       |
| `src/database/`      | The Drizzle config, the `tasks` schema, and `AppDatabase`.                       |
| `src/tasks/`         | A module, a controller with the CRUD routes, a repository, and a valibot schema. |
| `test/tasks.test.ts` | An end-to-end test, run through `createTestApp`.                                 |

## Next steps

- [Quick start](https://heximon.dev/docs/getting-started/quick-start)
- [Controllers](https://heximon.dev/docs/essentials/controllers)
- [Validation](https://heximon.dev/docs/essentials/validation)
- [Database](https://heximon.dev/docs/essentials/database)
- [Drizzle reference](https://heximon.dev/docs/essentials/drizzle)
- [Migrations](https://heximon.dev/docs/essentials/migrations)
