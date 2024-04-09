import { z } from 'zod';

export const viewLeaveRequestSchema = z
  .object({
    leaveId: z.string().optional(),
  })
  .strict();

export type ViewLeaveRequest = z.infer<typeof viewLeaveRequestSchema>;
