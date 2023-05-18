import auth from '@/actions/auth';
import prisma from '@/actions/prisma';
import { payload, tineInput, tineVar } from 'tinejs';
import { z } from 'zod';

const input = tineInput(z.object({ companyId: z.string() }));

const claims = auth.getClaims({ companyId: tineVar(input, 'companyId') });

const members = prisma.companyMember.findMany({
  where: { companyId: tineVar(claims, 'companyId') },
  include: {
    user: {
      select: {
        id: true,
        avatarUrl: true,
        firstName: true,
        lastName: true,
        role: true,
        email: true,
      },
    },
  },
});

const invites = prisma.companyInvite.findMany({
  where: { companyId: tineVar(claims, 'companyId') },
});

const companyMembers = payload(
  tineVar([invites, members] as const, ([$invites, $members]) => [
    ...$invites,
    ...$members,
  ])
);

export default companyMembers.withInput(input);
