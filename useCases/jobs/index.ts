import prisma from '@/actions/prisma';

const interview = prisma.interview.findMany({
  select: {
    id: true,
    intervieweeId: true,
  },
});

export default interview.noInput();
