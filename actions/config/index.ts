import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().nonempty(),
  MAGIC_SECRET_KEY: z.string().nonempty(),
  JWT_SECRET: z.string().nonempty(),
  S3_END_POINT: z.string().nonempty(),
  S3_ACCESS_KEY: z.string().nonempty(),
  S3_SECRET_KEY: z.string().nonempty(),
  MAIL_SERVICE_URI: z.string().nonempty(),
  MAIL_API_KEY: z.string().nonempty(),
});

export const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  MAGIC_SECRET_KEY: process.env.MAGIC_SECRET_KEY,
  JWT_SECRET: process.env.JWT_SECRET,
  S3_END_POINT: process.env.S3_END_POINT,
  S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
  S3_SECRET_KEY: process.env.S3_SECRET_KEY,
  MAIL_SERVICE_URI: process.env.MAIL_SERVICE_URI,
  MAIL_API_KEY: process.env.MAIL_API_KEY,
});
