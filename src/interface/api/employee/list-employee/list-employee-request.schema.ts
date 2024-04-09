import { z } from 'zod';

export const listEmployeeRequestSchema = z
  .object({
    name: z.string().optional(),
    phone: z.string().optional(),
    gender: z.string().optional(),
    dob: z.string().optional(),

    currentPage: z.number().optional(),
  })
  .strict();

export type ListEmployeeRequest = z.infer<typeof listEmployeeRequestSchema>;
