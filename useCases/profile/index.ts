import getClaims from '@/actions/auth/getClaims';
import prisma from '@/actions/prisma';
import presignedGet from '@/actions/s3/presignedGet';
import presignedPut from '@/actions/s3/presignedPut';

import { payload, tineVar } from 'tinejs';

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

const avatarUploadUrl = presignedPut({
  bucketName: 'user-avatars',
  objectName: tineVar(user, ({ id }) => `${id}.jpg`),
  expires: 3600,
});

const resumeUrl = presignedGet({
  bucketName: 'user-resumes',
  objectName: tineVar(user, ({ id }) => `${id}.pdf`),
  expires: 3600,
});

const resumeUploadUrl = presignedPut({
  bucketName: 'user-resumes',
  objectName: tineVar(user, ({ id }) => `${id}.pdf`),
  expires: 3600,
});

const profile = payload(
  tineVar(user, ($user) => ({
    ...$user,
    avatarUrl: tineVar(avatarUrl),
    avatarUploadUrl: tineVar(avatarUploadUrl),
    resumeUrl: tineVar(resumeUrl),
    resumeUploadUrl: tineVar(resumeUploadUrl),
  }))
);

export default profile.noInput();
