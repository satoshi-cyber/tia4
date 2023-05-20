import { tineAction } from 'tinejs';

import { presignedGetSchema } from './presignedGet-schema';

import { getClient } from '../lib';

const DEBOUNCE_TIME = 5 * 60 * 1000;

const presignedGet = tineAction(
  async ({ credentials, bucketName, objectName, expires, cache }, { ctx }) => {
    const client = getClient({ credentials, ctx });

    const time = new Date().getTime();

    return await client.presignedGetObject(
      bucketName,
      objectName,
      expires,
      cache ? new Date(time - (time % DEBOUNCE_TIME)) : new Date()
    );
  },
  {
    action: 's3.presignedGet',
    schema: presignedGetSchema,
  }
);

export default presignedGet;
