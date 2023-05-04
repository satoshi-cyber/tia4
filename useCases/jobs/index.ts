import prisma from '@/actions/prisma';

const jobs = prisma.job.findMany({});

export default jobs.noInput();
