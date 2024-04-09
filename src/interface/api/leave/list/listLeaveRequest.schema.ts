import { z } from 'zod';

export const listLeaveRequestSchema = z
  .object({
    userId: z.string().optional(),
    currentPage: z.number().optional(),
  })
  .strict();

export type ListLeaveRequest = z.infer<typeof listLeaveRequestSchema>;
