import { z } from 'zod';

export const deleteEmployeeRequestSchema = z
  .object({
    userId: z.string().optional(),
  })
  .strict();

export type DeleteEmployeeRequest = z.infer<typeof deleteEmployeeRequestSchema>;
