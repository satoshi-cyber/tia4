import getClaims from '@/actions/auth/getClaims';
import extend from '@/actions/extend';
import prisma from '@/actions/prisma';
import presignedGet from '@/actions/s3/presignedGet';
import presignedPut from '@/actions/s3/presignedPut';
import { tineInput, tineVar } from 'tinejs';
import { z } from 'zod';

const input = tineInput(z.object({ companyId: z.string() }));

const claims = getClaims({ companyId: tineVar(input, 'companyId') });

const companyRow = prisma.company.findUnique({
  where: {
    id: tineVar(claims, 'companyId'),
  },
  select: {
    id: true,
    name: true,
    website: true,
    description: true,
  },
});

const avatarUrl = presignedGet({
  bucketName: 'company-avatars',
  objectName: tineVar(companyRow, ({ id }) => `${id}.jpg`),
  expires: 3600,
});

const avatarUploadUrl = presignedPut({
  bucketName: 'company-avatars',
  objectName: tineVar(companyRow, ({ id }) => `${id}.jpg`),
  expires: 3600,
});

const myCompany = extend([
  tineVar(companyRow),
  {
    avatarUrl: tineVar(avatarUrl),
    avatarUploadUrl: tineVar(avatarUploadUrl),
  },
]);

export default myCompany.withInput(input);
