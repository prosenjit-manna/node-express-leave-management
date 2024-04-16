import { z } from 'zod';

export const addLeaveSettingsRequestSchema = z
  .object({
    userId: z.string(),
    createdBy: z.string(),
    cl: z.number().optional(),
    sl: z.number().optional(),
    el: z.number().optional(),
    cOff: z.number().optional(),
    mt: z.number().optional(),
    p: z.number().optional(),
    comment: z.string().optional(),
  })
  .strict();

export type AddLeaveSettingsRequest = z.infer<typeof addLeaveSettingsRequestSchema>;
