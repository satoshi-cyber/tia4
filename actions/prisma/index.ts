import { PrismaClient } from '@prisma/client/edge';
import useTine from 'tinejs.prisma';

const prisma = new PrismaClient().$extends(useTine);

export default prisma;

declare global {
  namespace PrismaJson {
    // you can use classes, interfaces, types, etc.
    type Question = {
      id: string;
      question: string;
      time: number;
    };
  }
}
