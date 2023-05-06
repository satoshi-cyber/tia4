import { tineAction } from 'tinejs';

import {
  fetchMetadataFromIssuer,
  getIssuer,
  validate,
} from './magic-functions';

const issuer = tineAction(
  async ({ did }: { did: string }) => {
    await validate(did);

    return getIssuer(did);
  },
  { action: 'magic.issuer' }
);

const metadata = tineAction(
  async ({ did }: { did: string }) => {
    await validate(did);

    const issuer = getIssuer(did);

    return fetchMetadataFromIssuer(issuer);
  },
  { action: 'magic.metadata' }
);

const magic = {
  issuer,
  metadata,
};

export default magic;
