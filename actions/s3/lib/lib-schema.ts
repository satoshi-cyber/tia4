import { z } from 'zod';

export const credentialsSchema = z
  .object({
    endPoint: z.string(),
    accessKey: z.string(),
    secretKey: z.string(),
    useSSL: z.boolean().optional(),
  })
  .optional();
