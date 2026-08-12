# Publishing & Packaging

Lucent enforces a production **publish gate** so a broken package can never ship. Everything below runs
in CI and locally via `pnpm --filter @orionshub/lucent ci`.

## The gate

| Check | Command | What it proves |
| --- | --- | --- |
| Build | `pnpm build` | Tokens compile; tsup emits ESM + `.d.ts`; `"use client"` preserved |
| Lint (CSS) | `pnpm lint:css` | No physical properties (RTL guard), valid tokens |
| Tests | `pnpm test` | 419+ unit/interaction/a11y tests pass |
| **publint** | `pnpm qa:publint` | `exports` map, `sideEffects`, and dual-format correctness |
| **attw** | `pnpm qa:attw` | Types resolve under every `exports` condition (ESM-only profile) |
| **size-limit** | `pnpm qa:size` | Per-entry bundle budgets — enforces "super light" |
| Tree-shake | `node test/tree-shake.fixture.mjs` | A single-component import prunes everything else |

## Package contract

- **ESM-only**, `"type": "module"`, per-component subpath `exports`.
- `sideEffects: ["**/*.css"]` — JS is prunable, CSS is never dropped.
- `radix-ui` is a regular dependency kept **external** so consumers dedupe one copy.
- `"use client"` is preserved on interactive entries (see [SSR & Next.js](/guide/ssr)).

## Tree-shake fixture

The fixture imports exactly one component and asserts that unrelated components do not appear in the
bundle — the concrete proof that a consumer "only pays for what they import":

```bash
node packages/react/test/tree-shake.fixture.mjs
```

## Next.js smoke build

`apps/next-smoke` is a minimal App Router app that imports a server-safe **and** a client component and
runs `next build`. It gates that the published `exports` + `"use client"` boundaries work in a real RSC
compiler — not just in tests.

## Releasing with Changesets

Versioning and changelogs use [Changesets](https://github.com/changesets/changesets):

```bash
# 1. Describe your change (creates a markdown changeset)
pnpm changeset

# 2. Version packages + update changelogs
pnpm changeset version

# 3. Build, run the full gate, then publish
pnpm --filter @orionshub/lucent ci
pnpm release   # runs `changeset publish`
```

`pnpm release` publishes to npm. Run it only after the gate is green and you are authenticated
(`npm whoami`). To preview without publishing:

```bash
cd packages/react
pnpm pack --dry-run   # inspect the exact file list that would ship
```

## Deploying the docs

The documentation site builds with `pnpm --filter @lucent/docs docs:build` and deploys to GitHub Pages
via `.github/workflows/docs.yml`. Set `DOCS_BASE` to change the base path for other hosts.
