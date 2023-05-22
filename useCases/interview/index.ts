import { z } from 'zod';
import { tineInput, tineVar } from 'tinejs';
import auth from '@/actions/auth';
import prisma from '@/actions/prisma';

const input = tineInput(z.object({ id: z.string(), companyId: z.string() }));

const claims = auth.getClaims({ companyId: tineVar(input, 'companyId') });

const interview = prisma.interview.findUnique({
  where: {
    id: tineVar(input, 'id'),
    job: {
      companyId: tineVar(claims, 'companyId'),
    },
  },
  include: {
    job: true,
    interviewee: true,
  },
});

export default interview.withInput(input);
