# ⏣ My Heximon app

This is a minimal [Heximon](https://github.com/heximon/heximon) backend with request bodies checked
by zod. One module, one controller, one provider — wired at build time, with no decorators and no
runtime container.

## Run it

```bash
pnpm dev     # http://localhost:3000
pnpm test    # run the tests
pnpm check   # format, lint, and type-check
pnpm build   # emit a standalone server into dist/
```

## Project layout

| File                            | What it does                                                   |
| :------------------------------ | :------------------------------------------------------------- |
| `heximon.config.ts`             | Lists the compiler plugins. One line per capability.           |
| `src/app.module.ts`             | The root module. It imports `UsersModule`.                     |
| `src/users/users.module.ts`     | Lists the provider and the controller.                         |
| `src/users/users.controller.ts` | Declares two `GET` routes and a validated `POST` route.        |
| `src/users/user.schema.ts`      | The zod schema. One declaration is the type and the validator. |
| `src/users/users.repository.ts` | The provider. It holds two seeded users, and creates new ones. |
| `test/users.test.ts`            | Tests the repository directly, with no HTTP call.              |

## Next steps

- [Quick start](https://heximon.dev/docs/getting-started/quick-start)
- [Controllers](https://heximon.dev/docs/essentials/controllers)
- [Validation](https://heximon.dev/docs/essentials/validation)
