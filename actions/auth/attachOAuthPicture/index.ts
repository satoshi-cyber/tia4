import presignedPut from '@/actions/s3/presignedPut';
import { tineAction } from 'tinejs';

import { getLargeAvatar } from './attachOAuthPicture-functions';
import { attachOAuthPictureSchema } from './attachOAuthPicture-schema';

const attachOAuthPicture = tineAction(
  async ({ user, fk, accessToken, provider }, { ctx }) => {
    if (!accessToken || !provider || !fk) {
      return user;
    }

    const avatar = await getLargeAvatar({
      provider,
      accessToken,
      fk,
    });

    if (!avatar) {
      return user;
    }

    const [imageData, uploadUrl] = await Promise.all([
      fetch(avatar).then((res) => res.arrayBuffer()),
      presignedPut({
        bucketName: 'user-avatars',
        objectName: `${user.id}.jpg`,
        expires: 3600,
      }).run({ ctx }),
    ]);

    await fetch(uploadUrl, {
      method: 'PUT',
      body: imageData,
    });

    return user;
  },
  {
    action: 'auth.attachOauthPictureSchema',
    schema: attachOAuthPictureSchema,
  }
);

export default attachOAuthPicture;
