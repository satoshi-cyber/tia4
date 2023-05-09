import { CompanyMember, User } from '@prisma/client/edge';
import { z } from 'zod';

const user: z.ZodType<
  User & {
    companies: CompanyMember[];
  }
> = z.any();

export const attachOAuthPictureSchema = z.object({
  user,
  fk: z.string().optional(),
  accessToken: z.string().optional(),
  provider: z.string().optional(),
});
