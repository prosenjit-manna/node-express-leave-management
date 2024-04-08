import { z } from 'zod';

export const viewEmployeeRequestSchema = z.object({
  userId: z.string(),
});

export type viewEmployeeRequest = z.infer<typeof viewEmployeeRequestSchema>;
