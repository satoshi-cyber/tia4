import { tineAction } from 'tinejs';

import {
  fetchMetadataFromIssuer,
  getIssuer,
  validate,
} from './magic-functions';

const getMetaData = tineAction(
  async ({ did }: { did: string }) => {
    await validate(did);

    const issuer = getIssuer(did);

    return fetchMetadataFromIssuer(issuer);
  },
  { action: 'magic.getMetaData' }
);

const magic = {
  getMetaData,
};

export default magic;
