import { z } from 'zod';

export const setupCompanySchema = z.object({
  name: z.string({ required_error: 'You must a company name' }),
  website: z.union([
    z.string().url('You must provide a valid url').nullish(),
    z.literal(''),
  ]),
});
