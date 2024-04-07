import { z } from 'zod';

export const employeeRequestSchema = z.object({
  userId: z.string(),
  name: z.string(),
  phone: z.string(),
  gender: z.string(),
  dob: z.string(),
});

export type EmployeeRequest = z.infer<typeof employeeRequestSchema>;
