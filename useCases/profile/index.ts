import getClaims from '@/actions/auth/getClaims';
import extend from '@/actions/extend';
import prisma from '@/actions/prisma';
import presignedGet from '@/actions/s3/presignedGet';

import { tineVar } from 'tinejs';

const claims = getClaims();

const user = prisma.user.findUnique({
  where: {
    id: tineVar(claims, 'userId'),
  },
});

const avatarUrl = presignedGet({
  bucketName: 'user-avatars',
  objectName: tineVar(user, ({ id }) => `${id}.jpg`),
  expires: 3600,
});

const profile = extend({
  data: tineVar(user),
  path: 'avatarUrl',
  value: tineVar(avatarUrl),
});

export default profile.noInput();
