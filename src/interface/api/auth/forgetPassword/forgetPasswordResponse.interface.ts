import { z } from 'zod';

export const forgetPasswordResponse = z
  .object({
    message: z.string(),
  })
  .strict();

export type ForgetPasswordResponse = z.infer<typeof forgetPasswordResponse>;
