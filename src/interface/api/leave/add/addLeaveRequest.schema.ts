import { z } from 'zod';
import { LeaveType } from '../../../data/leaveType.enum';

export const addLeaveRequestSchema = z
  .object({
    userId: z.string(),
    leaveStart: z.string(),
    leaveEnd: z.string(),
    count: z.number(),
    leaveType: z.enum(Object.values(LeaveType) as any),
  })
  .strict();

export type AddLeaveRequest = z.infer<typeof addLeaveRequestSchema>;
