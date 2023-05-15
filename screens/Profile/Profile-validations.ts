import { z } from 'zod';

export const updateProfileSchema = z.object({
  firstName: z
    .string({ required_error: 'You must enter your name' })
    .nullable(),
  lastName: z
    .string({ required_error: 'You must enter your last name' })
    .nullish(),
  linkedInProfile: z.union([
    z.string().url('You must provide a valid url').nullish(),
    z.literal(''),
  ]),
  bio: z.string().optional().nullable(),
});
