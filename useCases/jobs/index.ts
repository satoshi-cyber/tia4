import prisma from '@/actions/prisma';

const jobs = prisma.job.findMany({
    select: {
        id: true,
        title: true,
        questions: true
    }
});

export default jobs.noInput();
