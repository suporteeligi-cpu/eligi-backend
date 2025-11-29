import { z } from "zod";

export const businessHoursSchema = z.object({
  hours: z.array(z.object({
    dayOfWeek: z.number().min(0).max(6),
    openTime: z.string().nullable(),
    closeTime: z.string().nullable(),
    isClosed: z.boolean(),
  }))
});

export type BusinessHoursInput = z.infer<typeof businessHoursSchema>;
