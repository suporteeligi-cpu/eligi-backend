import { z } from "zod";

export const businessTypeSchema = z.object({
  segment: z.string().min(2)
});

export type BusinessTypeInput = z.infer<typeof businessTypeSchema>;

export const basicInfoSchema = z.object({
  businessName: z.string().min(2),
  phone: z.string().optional(),
  segment: z.string().min(2)
});

export type BasicInfoInput = z.infer<typeof basicInfoSchema>;

export const locationSchema = z.object({
  street: z.string().min(2),
  number: z.string().min(1),
  complement: z.string().optional(),
  district: z.string().min(2),
  city: z.string().min(2),
  latitude: z.number(),
  longitude: z.number(),
});

export type LocationInput = z.infer<typeof locationSchema>;

export const finishStepSchema = z.object({
  confirm: z.boolean().optional(),
});

export type FinishStepInput = z.infer<typeof finishStepSchema>;
