import { z } from 'zod';

export const basicInfoSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8).optional(),
  segment: z.string().optional()
});

export type BasicInfoInput = z.infer<typeof basicInfoSchema>;

export const locationSchema = z.object({
  businessId: z.string().uuid(),
  street: z.string().min(2),
  number: z.string().min(1),
  neighborhood: z.string().min(2),
  city: z.string().min(2),
  state: z.string().min(2),
  zipCode: z.string().min(4)
});

export type LocationInput = z.infer<typeof locationSchema>;

export const finishStepSchema = z.object({
  businessId: z.string().uuid()
});

export type FinishStepInput = z.infer<typeof finishStepSchema>;
