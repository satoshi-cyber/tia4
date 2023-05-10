import { credentialsSchema } from './lib-schema';
import MinioClient from './minioClient';

export const getClient = ({
  ctx,
  credentials,
}: {
  ctx: Map<any, any>;
  credentials: Zod.infer<typeof credentialsSchema>;
}): MinioClient => {
  if (!ctx.get('.minioClient')) {
    ctx.set(
      '.minioClient',
      new MinioClient({
        endPoint: process.env.S3_END_POINT!,
        accessKey: process.env.S3_ACCESS_KEY,
        secretKey: process.env.S3_SECRET_KEY,
        useSSL: true,
        ...credentials,
        region: 'eu-east-1', // TODO: get region from ip
      })
    );
  }

  return ctx.get('.minioClient');
};
