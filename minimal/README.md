# ⏣ My Heximon app

This is the smallest real [Heximon](https://github.com/heximon/heximon) backend: one module, one
controller, one provider. A build step reads your classes and writes the wiring — no decorators, no
runtime container.

## Run it

```bash
pnpm dev     # http://localhost:3000
pnpm test    # run the tests
pnpm check   # format, lint, and type-check
pnpm build   # emit a standalone server into dist/
```

## Project layout

| File                            | What it does                                                |
| :------------------------------ | :---------------------------------------------------------- |
| `heximon.config.ts`             | Lists the compiler plugins. One line per capability.        |
| `src/app.module.ts`             | The root module. It imports `UsersModule`.                  |
| `src/users/users.module.ts`     | Lists the provider and the controller.                      |
| `src/users/users.controller.ts` | Declares two `GET` routes from the handler parameter types. |
| `src/users/users.repository.ts` | The provider. It holds two seeded users in memory.          |
| `test/users.test.ts`            | Tests the repository directly, with no HTTP call.           |

## Next steps

- [Quick start](https://heximon.dev/docs/getting-started/quick-start)
- [Controllers](https://heximon.dev/docs/essentials/controllers)
- [Core concepts](https://heximon.dev/docs/getting-started/core-concepts)
