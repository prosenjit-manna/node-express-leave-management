import { z } from 'zod';

export const employeeRequestSchema = z
  .object({
    userId: z.string(),
    name: z.string(),
    phone: z.string(),
    gender: z.string().refine((v) => ['M', 'F'].includes(v), {
      message: 'Invalid gender',
    }),
    dob: z.string(),
  })
  .strict();

export type EmployeeRequest = z.infer<typeof employeeRequestSchema>;
