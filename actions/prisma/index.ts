import { PrismaClient } from '@prisma/client/edge';
import tinejsPrisma from 'tinejs.prisma';

import company from './extend/company';
import interview from './extend/interview';
import user from './extend/user';

const prisma = new PrismaClient()
  .$extends({
    result: {
      company,
      interview,
      user,
    },
  })
  .$extends(tinejsPrisma);

export default prisma;

declare global {
  namespace PrismaJson {
    // Prisma JSON fields
    type Question = {
      id: string;
      question: string;
      time: number;
    };

    type Answer = {
      url?: string;
      question: Question;
    };
  }
}
