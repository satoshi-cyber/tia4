interface UserInfo {
  firstName?: string;
  lastName?: string;
  fk?: string;
  accessToken?: string;
  provider?: string;
}

export const getLargeAvatar = async ({
  provider,
  accessToken,
  fk,
}: UserInfo): Promise<string | undefined> => {
  try {
    if (provider === 'google') {
      const res = await fetch(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`
      );

      const data = await res.json();
      return data.picture;
    }

    if (provider === 'facebook') {
      const res = await fetch(
        `https://graph.facebook.com/${fk}?fields=picture.width(800).height(800)&access_token=${accessToken}`
      );

      const data = await res.json();
      return data.picture.data.url;
    }

    if (provider === 'linkedin') {
      const res = await fetch(
        `https://api.linkedin.com/v2/me?projection=(profilePicture(displayImage~:playableStreams))&oauth2_access_token=${accessToken}`
      );

      const data = await res.json();
      return data.profilePicture['displayImage~'].elements.at(-1).identifiers[0]
        .identifier;
    }
  } catch (e) {
    console.log(e);
  }
};
