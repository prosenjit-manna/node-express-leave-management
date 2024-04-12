import { z } from 'zod';

export const loginRequestResponse = z
  .object({
    username: z.string(),
    password: z.string(),
    verificationToken: z.string().optional(),
  })
  .strict();

export type LoginRequest = z.infer<typeof loginRequestResponse>;
