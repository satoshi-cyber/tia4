import { tineAction } from 'tinejs';

import { getLargeAvatar } from './attachOAuthPicture-functions';
import { attachOAuthPictureSchema } from './attachOAuthPicture-schema';

const attachOAuthPicture = tineAction(
  async ({ user, fk, accessToken, provider }) => {
    if (!accessToken || !provider || !fk) {
      return user;
    }

    const avatar = getLargeAvatar({
      provider,
      accessToken,
      fk,
    });

    console.log(avatar);

    return user;
  },
  {
    action: 'auth.attachOauthPictureSchema',
    schema: attachOAuthPictureSchema,
  }
);

export default attachOAuthPicture;
