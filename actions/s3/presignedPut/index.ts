import { tineAction } from 'tinejs';

import { presignedPutSchema } from './presignedPut-schema';

import { getClient } from '../lib';

const presignedPut = tineAction(
  async ({ credentials, bucketName, objectName, expires }, { ctx }) => {
    const client = getClient({ credentials, ctx });

    return await client.presignedPutObject(bucketName, objectName, expires);
  },
  {
    action: 's3.presignedPut',
    schema: presignedPutSchema,
  }
);

export default presignedPut;
