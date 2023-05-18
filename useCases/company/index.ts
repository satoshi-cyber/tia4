import prisma from '@/actions/prisma';
import presignedGet from '@/actions/s3/presignedGet';
import { payload, tineInput, tineVar } from 'tinejs';
import { z } from 'zod';

const input = tineInput(z.object({ companyId: z.string() }));

const companyRow = prisma.company.findUnique({
  where: {
    id: tineVar(input, 'companyId'),
  },
  select: {
    id: true,
    name: true,
  },
});

const avatarUrl = presignedGet({
  bucketName: 'company-avatars',
  objectName: tineVar(companyRow, ({ id }) => `${id}.jpg`),
  expires: 3600,
});

const company = payload(
  tineVar(companyRow, ($companyRow) => ({
    ...$companyRow,
    avatarUrl: tineVar(avatarUrl),
  }))
);

// Is used in join company and needs to be public endpoint
export default company.withInput(input);
