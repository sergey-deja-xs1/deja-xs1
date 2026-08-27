import { readFileSync } from "node:fs";
import { Sentry } from "./instrument.js";
import { ReceiptEventSchema } from "./schema.js";

const EVENTS_LOG = new URL("../../events.jsonl", import.meta.url);

function processReceiptEvents(): number {
  const lines = readFileSync(EVENTS_LOG, "utf-8").split("\n").filter(Boolean);
  let rejected = 0;

  for (const line of lines) {
    const raw = JSON.parse(line);
    const result = ReceiptEventSchema.safeParse(raw);

    if (!result.success) {
      const sentryId = Sentry.captureException(
        new Error(`Schema validation failed for event ${raw.eventId ?? "unknown"}: ${result.error.message}`)
      );
      console.error("REJECTED", raw.eventId, "sentry_event_id:", sentryId, result.error.issues);
      rejected++;
      continue;
    }

    console.log("processed", result.data.eventId, result.data.amountCents, result.data.currency);
  }

  return rejected;
}

const rejected = processReceiptEvents();

// captureException only queues; the process would exit before the HTTP
// request completes without this.
await Sentry.flush(5000);

if (rejected > 0) {
  console.error(`${rejected} event(s) failed schema validation`);
  process.exit(1);
}
