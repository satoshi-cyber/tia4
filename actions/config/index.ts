import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().nonempty(),
  MAGIC_SECRET_KEY: z.string().nonempty(),
  JWT_SECRET: z.string().nonempty(),
});

export const env = envSchema.parse(process.env);
