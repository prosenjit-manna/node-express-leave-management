import { z } from 'zod';

export const viewEmployeeRequestSchema = z.object({
  employeeId: z.string(),
});

export type viewEmployeeRequest = z.infer<typeof viewEmployeeRequestSchema>;
