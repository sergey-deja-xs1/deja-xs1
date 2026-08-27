import { z } from "zod";

export const ReceiptEventSchema = z.object({
  eventId: z.string(),
  receiptId: z.string(),
  // Renamed from `amountCents` to `amount` (now a decimal) to match the
  // new billing UI. Consumer was not updated — see consumer/src/schema.ts.
  amount: z.number(),
  currency: z.string(),
  issuedAt: z.string().datetime(),
});

export type ReceiptEvent = z.infer<typeof ReceiptEventSchema>;
