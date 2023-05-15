import getClaims from '@/actions/auth/getClaims';
import extendArray from '@/actions/extendArray';
import prisma from '@/actions/prisma';
import presignedGet from '@/actions/s3/presignedGet';
import { payload, tineInput, tineVar } from 'tinejs';
import { z } from 'zod';

const input = tineInput(z.object({ companyId: z.string() }));

const claims = getClaims({ companyId: tineVar(input, 'companyId') });

const membersData = prisma.companyMember.findMany({
  where: { companyId: tineVar(claims, 'companyId') },
  include: { user: true },
});

const members = extendArray([
  tineVar(membersData),
  (item) => ({
    user: {
      ...item.user,
      avatarUrl: tineVar(
        presignedGet({
          bucketName: 'user-avatars',
          objectName: `${item.user.id}.jpg`,
          expires: 3600,
        })
      ),
    },
  }),
]);

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
