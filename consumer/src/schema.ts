import { z } from "zod";

// Intentionally NOT shared with producer/src/schema.ts — this consumer owns
// its own copy of the contract, the way a real downstream team would.
export const ReceiptEventSchema = z.object({
  eventId: z.string(),
  receiptId: z.string(),
  amountCents: z.number().int(),
  currency: z.string(),
  issuedAt: z.string().datetime(),
});

export type ReceiptEvent = z.infer<typeof ReceiptEventSchema>;
