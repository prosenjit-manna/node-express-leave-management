import { z } from 'zod';

export const editEmployeeRequestSchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  phone: z.string(),
  gender: z.string().refine((v) => ['M', 'F'].includes(v), {
    message: 'Invalid gender',
  }),
  dob: z.string(),
});

export type EditEmployeeRequest = z.infer<typeof editEmployeeRequestSchema>;
