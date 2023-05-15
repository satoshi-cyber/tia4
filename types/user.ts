import { z } from 'zod';

export const updateProfileSchema = z.object({
  firstName: z.string().min(1, 'You must enter your first name'),
  lastName: z.string().min(1, 'You must enter your last name'),
  linkedInProfile: z.union([
    z.string().url('You must provide a valid url').nullish(),
    z.literal(''),
  ]),
  bio: z.string().optional().nullable(),
});
