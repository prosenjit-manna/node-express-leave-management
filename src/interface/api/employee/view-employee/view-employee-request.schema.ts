import { z } from 'zod';

export const viewEmployeeRequestSchema = z
  .object({
    employeeId: z.string(),
  })
  .strict();

export type viewEmployeeRequest = z.infer<typeof viewEmployeeRequestSchema>;
