import { z } from 'zod';

export const loginSuccessResponse = z
  .object({
    token: z.string(),
  })
  .strict();

export type LoginSuccessResponse = z.infer<typeof loginSuccessResponse>;

export const loginErrorResponse = z
  .object({
    error: z.string(),
  })
  .strict();

export type LoginErrorResponse = z.infer<typeof loginErrorResponse>;
