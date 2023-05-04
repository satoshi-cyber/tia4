import { PrismaClient } from '@prisma/client/edge';
import useTine from 'tinejs.prisma';

const prisma = new PrismaClient().$extends(useTine);

export default prisma;
