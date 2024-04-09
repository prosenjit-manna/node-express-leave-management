import { z } from 'zod';

export const deleteLeaveRequestSchema = z
  .object({
    leaveId: z.string(),
  })
  .strict();

export type DeleteLeaveRequest = z.infer<typeof deleteLeaveRequestSchema>;
