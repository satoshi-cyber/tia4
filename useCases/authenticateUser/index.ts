import attachOauthPicture from '@/actions/auth/attachOAuthPicture';
import signToken from '@/actions/auth/signToken';
import magic from '@/actions/magic';
import prisma from '@/actions/prisma';
import { condition, tineInput, tineVar } from 'tinejs';
import { z } from 'zod';

const input = tineInput(
  z.object({
    did: z.string(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    fk: z.string().optional(),
    accessToken: z.string().optional(),
    provider: z.string().optional(),
  })
);

const magicMeta = magic.metadata({ did: tineVar(input, 'did') });

const user = prisma.user.findUnique({
  where: { email: tineVar(magicMeta, 'email') },
  include: {
    companies: true,
  },
});

const userToken = signToken(tineVar(user));

const createUser = prisma.user.create({
  data: {
    firstName: tineVar(input, 'firstName'),
    lastName: tineVar(input, 'lastName'),
    issuer: tineVar(magicMeta, 'issuer'),
    publicAddress: tineVar(magicMeta, 'publicAddress'),
    email: tineVar(magicMeta, 'email'),
  },
  include: {
    companies: true,
  },
});

const userWithOAuthData = attachOauthPicture({
  user: tineVar(createUser),
  fk: tineVar(input, 'fk'),
  accessToken: tineVar(input, 'accessToken'),
  provider: tineVar(input, 'provider'),
});

const createUserToken = signToken(tineVar(userWithOAuthData));

const authenticateUser = condition([
  tineVar(user, ($user) => Boolean($user)),
  tineVar(userToken),
  tineVar(createUserToken),
]);

export default authenticateUser.withInput(input);
