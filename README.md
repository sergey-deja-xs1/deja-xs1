# deja-xs1

Test environment for card `xs1`: a producer/consumer pair where the producer's
event schema can drift out from under the consumer, plus CI that deploys and
reports to Sentry.

- `producer/` — emits `ReceiptEvent`s to `events.jsonl`, Sentry-instrumented.
- `consumer/` — reads `events.jsonl`, validates against its own copy of the
  schema, Sentry-instrumented.
- `.github/workflows/deploy.yml` — builds both, runs producer → consumer
  against the same log (this is where a schema break surfaces), then creates
  a GitHub Deployment and notifies Sentry of the release.

## Local run

```bash
npm install
npm run build --workspaces
node producer/dist/index.js
node consumer/dist/index.js
```

## Secrets this repo's Actions workflow expects

- `SENTRY_DSN`
- `SENTRY_AUTH_TOKEN`, `SENTRY_ORG`, `SENTRY_PROJECT` (Sentry deploy notification; step is skipped if unset)
