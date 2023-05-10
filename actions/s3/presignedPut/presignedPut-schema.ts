import { z } from 'zod';

import { credentialsSchema } from '../lib';

export const presignedGetSchema = z.object({
  credentials: credentialsSchema,
  bucketName: z.string(),
  objectName: z.string(),
  expires: z.number(),
});
