import { AWS_S3_ENDPOINT } from './minioClient-constants';

export type Region = keyof typeof AWS_S3_ENDPOINT;

export interface MinioClientParams {
  endPoint: string;
  region: Region;
  port?: number;
  useSSL?: boolean;
  accessKey?: string;
  secretKey?: string;
  sessionToken?: string;
  pathStyle?: boolean;
  partSize?: number;
  s3AccelerateEndpoint?: string;
}

export interface RequestOptions {
  method: string;
  region?: Region;
  bucketName?: string;
  objectName?: string;
  headers: Record<string, string>;
  query?: string;
  port?: number;
  protocol?: string;
  path: string;
  host?: string;
  userAgent?: string;
  reqOptions?: Record<string, any>;
}
