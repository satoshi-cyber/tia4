import getClaims from '@/actions/auth/getClaims';
import prisma from '@/actions/prisma';
import { tineVar } from 'tinejs';

const claims = getClaims();

const myInterviews = prisma.interview.findMany({
  where: {
    intervieweeId: tineVar(claims, 'userId'),
  },
  orderBy: { createdAt: 'desc' },
  select: {
    id: true,
    createdAt: true,
    status: true,
    answers: true,
    thumbnail: true,
    job: {
      include: {
        company: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
    },
  },
});

export default myInterviews.noInput();
