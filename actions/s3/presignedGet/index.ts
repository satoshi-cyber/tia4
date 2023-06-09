import { tineAction } from 'tinejs';

import { presignedGetSchema } from './presignedGet-schema';

import { getClient } from '../lib';

const presignedGet = tineAction(
  async ({ credentials, bucketName, objectName, expires }, { ctx }) => {
    const client = getClient({ credentials, ctx });

    return await client.presignedGetObject(bucketName, objectName, expires, {
      'response-cache-control': 'max-age=604800',
    });
  },
  {
    action: 's3.presignedGet',
    schema: presignedGetSchema,
    skipLog: true,
  }
);

export default presignedGet;
