import { z } from 'zod';
import { LeaveType } from '../../../data/leaveType.enum';

export const editLeaveRequestSchema = z
  .object({
    id: z.string(),
    userId: z.string(),
    leaveStart: z.string(),
    leaveEnd: z.string(),
    count: z.number(),
    leaveType: z.enum(Object.values(LeaveType) as any),
  })
  .strict();

export type EditLeaveRequest = z.infer<typeof editLeaveRequestSchema>;
