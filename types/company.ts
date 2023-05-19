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

export const CompanyRoles = {
  member: 'member',
  adminMember: 'adminMember',
};

export const inviteCompanyMembersSchema = z.object({
  teamMembers: z
    .array(
      z.object({
        recipientEmail: z
          .string({ required_error: 'You must add recipient email' })
          .email('Email should be valid'),
        role: z.enum(['member', 'adminMember'], {
          required_error: 'You must specify the role',
        }),
      })
    )
    .min(1),
});
