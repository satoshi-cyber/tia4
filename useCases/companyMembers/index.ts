import auth from '@/actions/auth';
import prisma from '@/actions/prisma';
import { task, tineInput, tineVar } from 'tinejs';
import { z } from 'zod';

const input = tineInput(z.object({ companyId: z.string() }));

const claims = auth.getClaims({ companyId: tineVar(input, 'companyId') });

const getMembers = prisma.companyMember.findMany({
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

const getInvites = prisma.companyInvite.findMany({
  where: { companyId: tineVar(claims, 'companyId') },
});

const companyMembers = task(async (ctx) => {
  const [invites, members] = await Promise.all([
    getInvites.run(ctx),
    getMembers.run(ctx),
  ]);

  return [...invites, ...members];
});

export default companyMembers.withInput(input);
