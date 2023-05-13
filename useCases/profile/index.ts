import getClaims from '@/actions/auth/getClaims';
import extend from '@/actions/extend';
import prisma from '@/actions/prisma';
import presignedGet from '@/actions/s3/presignedGet';
import presignedPut from '@/actions/s3/presignedPut';

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

const uploadAvatarUrl = presignedPut({
  bucketName: 'user-avatars',
  objectName: tineVar(user, ({ id }) => `${id}.jpg`),
  expires: 3600,
});

const resumeUrl = presignedGet({
  bucketName: 'user-resumes',
  objectName: tineVar(user, ({ id }) => `${id}.pdf`),
  expires: 3600,
});

const uploadResumeUrl = presignedPut({
  bucketName: 'user-resumes',
  objectName: tineVar(user, ({ id }) => `${id}.pdf`),
  expires: 3600,
});

const profile = extend([
  tineVar(user),
  {
    avatarUrl: tineVar(avatarUrl),
    uploadAvatarUrl: tineVar(uploadAvatarUrl),
    resumeUrl: tineVar(resumeUrl),
    uploadResumeUrl: tineVar(uploadResumeUrl),
  },
]);

export default profile.noInput();
