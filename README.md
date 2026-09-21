# ⏣ Heximon Starters

The templates `heximon create` (and `pnpm create heximon`) scaffold from. Each one is a complete,
runnable [Heximon](https://github.com/heximon/heximon) app: install it, run it, and start editing.

## Templates

| Template | What you get |
| :-- | :-- |
| `minimal` | One module, one controller, one provider — the smallest real app. |
| `minimal-zod` | `minimal` plus a validated `POST` route, checked with zod. |
| `minimal-valibot` | `minimal` plus a validated `POST` route, checked with valibot. |
| `database` | A tasks CRUD API on Drizzle ORM and SQLite. No database server to install. |
| `database-zod` | `database` plus validated request bodies, checked with zod. |
| `database-valibot` | `database` plus validated request bodies, checked with valibot. |

## How `heximon create` picks one

Run the command with no flags. It asks for a template, then a validator.

```bash
pnpm create heximon my-app
```

Pass flags to skip the prompts and pick both up front:

```bash
heximon create my-app --template database --validator zod
```

The CLI fetches the chosen template from the `heximon/starters` repository with
[giget](https://unjs.io/packages/giget), then stamps your project name onto it. Fetch one directly,
without the CLI:

```bash
pnpx giget gh:heximon/starters/minimal my-app
```

## Learn more

- [Creating a new app](https://heximon.dev/docs/cli/create) — every flag, and where templates come from.
- [Quick start](https://heximon.dev/docs/getting-started/quick-start)
