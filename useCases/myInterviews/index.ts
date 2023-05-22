import { tineVar } from 'tinejs';
import auth from '@/actions/auth';
import prisma from '@/actions/prisma';

const claims = auth.getClaims();

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
      select: {
        id: true,
        title: true,
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
