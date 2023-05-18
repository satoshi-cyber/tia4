import attachOAuthPicture from './attachOAuthPicture';
import getClaims from './getClaims';
import getClaimsSafe from './getClaimsSafe';
import signToken from './signToken';

const auth = {
  signToken,
  getClaims,
  getClaimsSafe,
  attachOAuthPicture,
};

export default auth;
