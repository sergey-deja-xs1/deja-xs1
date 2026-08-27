import { z } from "zod";

export const ReceiptEventSchema = z.object({
  eventId: z.string(),
  receiptId: z.string(),
  amountCents: z.number().int(),
  currency: z.string(),
  issuedAt: z.string().datetime(),
});

export type ReceiptEvent = z.infer<typeof ReceiptEventSchema>;
