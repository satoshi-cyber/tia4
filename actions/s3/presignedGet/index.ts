import { tineAction } from 'tinejs';

import { presignedGetSchema } from './presignedGet-schema';

import { getClient } from '../lib';

const presignedGet = tineAction(
  async ({ credentials, bucketName, objectName, expires }, { ctx }) => {
    const client = getClient({ credentials, ctx });

    return await client.presignedGetObject(bucketName, objectName, expires);
  },
  {
    action: 's3.presignedGet',
    schema: presignedGetSchema,
  }
);

export default presignedGet;
