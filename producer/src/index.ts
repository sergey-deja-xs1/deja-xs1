import { appendFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { Sentry } from "./instrument.js";
import { ReceiptEventSchema, type ReceiptEvent } from "./schema.js";

const EVENTS_LOG = new URL("../../events.jsonl", import.meta.url);

function emitReceiptEvent(input: Omit<ReceiptEvent, "eventId" | "issuedAt">): ReceiptEvent {
  const event: ReceiptEvent = {
    eventId: randomUUID(),
    issuedAt: new Date().toISOString(),
    ...input,
  };

  const parsed = ReceiptEventSchema.parse(event);
  appendFileSync(EVENTS_LOG, JSON.stringify(parsed) + "\n");
  console.log("emitted", parsed.eventId);
  return parsed;
}

try {
  emitReceiptEvent({ receiptId: "rcpt_001", amount: 42.0, currency: "USD" });
  emitReceiptEvent({ receiptId: "rcpt_002", amount: 19.99, currency: "USD" });
} catch (err) {
  Sentry.captureException(err);
  await Sentry.flush(5000);
  throw err;
}
