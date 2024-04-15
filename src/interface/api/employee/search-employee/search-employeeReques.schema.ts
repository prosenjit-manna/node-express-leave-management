import { z } from 'zod';

export const searchEmployeeRequestSchema = z
  .object({
    username: z.string().email(),
  })
  .strict();

export type searchEmployeeRequest = z.infer<typeof searchEmployeeRequestSchema>;
