import { readFileSync } from "node:fs";
import { Sentry } from "./instrument.js";
import { ReceiptEventSchema } from "./schema.js";

const EVENTS_LOG = new URL("../../events.jsonl", import.meta.url);

function processReceiptEvents(): void {
  const lines = readFileSync(EVENTS_LOG, "utf-8").split("\n").filter(Boolean);

  for (const line of lines) {
    const raw = JSON.parse(line);
    const result = ReceiptEventSchema.safeParse(raw);

    if (!result.success) {
      Sentry.captureException(
        new Error(`Schema validation failed for event ${raw.eventId ?? "unknown"}: ${result.error.message}`)
      );
      console.error("REJECTED", raw.eventId, result.error.issues);
      continue;
    }

    console.log("processed", result.data.eventId, result.data.amountCents, result.data.currency);
  }
}

processReceiptEvents();
