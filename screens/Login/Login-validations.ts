import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({ required_error: 'You must enter your email!' })
    .email('You must enter a valid email'),
});
