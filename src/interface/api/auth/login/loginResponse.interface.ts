import { z } from 'zod';

export const loginSuccessResponse = z.object({
  token: z.string(),
});

export type LoginSuccessResponse = z.infer<typeof loginSuccessResponse>;
