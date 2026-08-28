import { z } from "zod";

export const SUPPORTED_CURRENCIES = ["USD", "EUR", "GBP"] as const;

export const ReceiptEventSchema = z.object({
  eventId: z.string(),
  receiptId: z.string(),
  amountCents: z.number().int(),
  currency: z.enum(SUPPORTED_CURRENCIES),
  issuedAt: z.string().datetime(),
});

export type ReceiptEvent = z.infer<typeof ReceiptEventSchema>;
