import auth from '@/actions/auth';
import condition from '@/actions/condition';
import magic from '@/actions/magic';
import prisma from '@/actions/prisma';
import { tineVar } from 'tinejs';
import { z } from 'zod';

const input = z.object({
  did: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  fk: z.string().optional(),
  accessToken: z.string().optional(),
  provider: z.string().optional(),
});

const magicMeta = magic.getMetaData({ did: tineVar(input, 'did') });

const user = prisma.user.findUnique({
  where: { email: tineVar(magicMeta, 'email') },
  include: {
    companies: true,
  },
});

const token = auth.signToken(tineVar(user));

const returnOrCreate = condition([
  tineVar(user, ($user) => Boolean($user)),
  tineVar(token),
]);

export default returnOrCreate.withInput(input);
