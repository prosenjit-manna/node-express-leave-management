import { z } from 'zod';

export interface RegisterResponse {
  message?: string;
  error?: string;
}

export const registerSuccessResponse = z.object({
  message: z.string(),
});

export const registerErrorResponse = z.object({
  message: z.string(),
});

export type RegisterSuccessResponse = z.infer<typeof registerSuccessResponse>;
export type RegisterErrorResponse = z.infer<typeof registerErrorResponse>;
