import { z } from "zod";

export const ReceiptEventSchema = z.object({
  eventId: z.string(),
  receiptId: z.string(),
  amount: z.number(),
  currency: z.string(),
  issuedAt: z.string().datetime(),
});

export type ReceiptEvent = z.infer<typeof ReceiptEventSchema>;
