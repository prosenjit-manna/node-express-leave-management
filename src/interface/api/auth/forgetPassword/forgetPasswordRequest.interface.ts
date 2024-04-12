import { z } from 'zod';

export const forgetPasswordRequest = z
  .object({
    email: z.string().email(),
  })
  .strict();

export type ForgetPasswordRequest = z.infer<typeof forgetPasswordRequest>;
