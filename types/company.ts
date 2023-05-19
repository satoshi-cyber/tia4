import { z } from 'zod';

export const setupCompanySchema = z.object({
  name: z.string({ required_error: 'You must provide a company name' }),
  website: z.union([
    z.string().url('You must provide a valid url').nullish(),
    z.literal(''),
  ]),
});

export const editCompanySchema = z.object({
  name: z.string({ required_error: 'You must provide a company name' }),
  website: z.union([
    z.string().url('You must provide a valid url').nullish(),
    z.literal(''),
  ]),
  description: z.string().nullable(),
});
