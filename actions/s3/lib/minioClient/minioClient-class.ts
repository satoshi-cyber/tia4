import querystring from 'query-string';

import {
  getS3Endpoint,
  isAmazonEndpoint,
  isValidBucketName,
  isValidEndpoint,
  isValidObjectName,
  isValidPort,
  isVirtualHostStyle,
  presignSignatureV4,
  uriResourceEscape,
} from './minioClient-functions';
import { MinioClientParams, Region, RequestOptions } from './minioClient-types';

export class MinioClient {
  private host: string;
  private port: number;
  private protocol: string;
  private accessKey: string;
  private secretKey: string;
  private sessionToken: string;
  private userAgent: string;
  private pathStyle: boolean;
  private anonymous: boolean;
  private region: Region;
  private partSize: number;
  private s3AccelerateEndpoint: string | null;
  private reqOptions: any;

  constructor(params: MinioClientParams) {
    // Default values if not specified.
    if (typeof params.useSSL === 'undefined') params.useSSL = true;
    if (!params.port) params.port = 0;
    // Validate input params.
    if (!isValidEndpoint(params.endPoint)) {
      throw new Error(`Invalid endPoint : ${params.endPoint}`);
    }
    if (!isValidPort(params.port)) {
      throw new Error(`Invalid port : ${params.port}`);
    }

    const host = params.endPoint.toLowerCase();
    let port = params.port;
    let protocol = '';

    // Validate if configuration is not using SSL
    // for constructing relevant endpoints.
    if (params.useSSL === false) {
      protocol = 'http:';
      if (port === 0) {
        port = 80;
      }
    } else {
      // Defaults to secure.
      protocol = 'https:';
      if (port === 0) {
        port = 443;
      }
    }

    // User Agent should always following the below style.
    // Please open an issue to discuss any new changes here.
    //
    //       MinIO (OS; ARCH) LIB/VER APP/VER
    //
    const libraryComments = `(${process.platform}; ${process.arch})`;
    const libraryAgent = `MinIO ${libraryComments} minio-js/7.0.33`;
    // User agent block ends.

    this.host = host;
    this.region = params.region;
    this.port = port;
    this.protocol = protocol;
    this.accessKey = params.accessKey || '';
    this.secretKey = params.secretKey || '';
    this.sessionToken = params.sessionToken || '';
    this.userAgent = `${libraryAgent}`;

    // Default path style is true
    if (params.pathStyle === undefined) {
      this.pathStyle = true;
    } else {
      this.pathStyle = params.pathStyle;
    }

    this.anonymous = !this.accessKey || !this.secretKey;

    this.partSize = 64 * 1024 * 1024;
    if (params.partSize) {
      this.partSize = params.partSize;
    }
    if (this.partSize < 5 * 1024 * 1024) {
      throw new Error(`Part size should be greater than 5MB`);
    }
    if (this.partSize > 5 * 1024 * 1024 * 1024) {
      throw new Error(`Part size should be less than 5GB`);
    }

    // SHA256 is enabled only for authenticated http requests. If the request is authenticated
    // and the connection is https we use x-amz-content-sha256=UNSIGNED-PAYLOAD
    // header for signature calculation.
    // this.enableSHA256 = !this.anonymous && !params.useSSL;

    this.s3AccelerateEndpoint = params.s3AccelerateEndpoint || null;
    this.reqOptions = {};
  }

  private getAccelerateEndPointIfSet(
    bucketName: string,
    objectName: string
  ): string | false {
    if (this.s3AccelerateEndpoint && bucketName && objectName) {
      // http://docs.aws.amazon.com/AmazonS3/latest/dev/transfer-acceleration.html
      // Disable transfer acceleration for non-compliant bucket names.
      if (bucketName.includes('.')) {
        throw new Error(
          `Transfer Acceleration is not supported for non compliant bucket:${bucketName}`
        );
      }
      // If transfer acceleration is requested set new host.
      // For more details about enabling transfer acceleration read here.
      // http://docs.aws.amazon.com/AmazonS3/latest/dev/transfer-acceleration.html
      return this.s3AccelerateEndpoint;
    }
    return false;
  }

  getRequestOptions(opts: {
    method: string;
    region: Region;
    bucketName: string;
    objectName: string;
    query: string;
    headers?: Record<string, any>;
    pathStyle?: boolean;
  }): RequestOptions {
    const method = opts.method;
    const region = opts.region;
    const bucketName = opts.bucketName;
    let objectName = opts.objectName;
    const query = opts.query;

    const reqOptions: any = { method };
    reqOptions.headers = {};

    // Verify if virtual host supported.
    const virtualHostStyle: boolean | undefined = bucketName
      ? isVirtualHostStyle(this.host, this.protocol, bucketName, this.pathStyle)
      : undefined;

    if (this.port) reqOptions.port = this.port;
    reqOptions.protocol = this.protocol;

    if (objectName) {
      objectName = `${uriResourceEscape(objectName)}`;
    }

    reqOptions.path = '/';

    // Save host.
    reqOptions.host = this.host;
    // For Amazon S3 endpoint, get endpoint based on region.
    if (isAmazonEndpoint(reqOptions.host)) {
      const accelerateEndPoint = this.getAccelerateEndPointIfSet(
        bucketName,
        objectName
      );
      if (accelerateEndPoint) {
        reqOptions.host = `${accelerateEndPoint}`;
      } else {
        reqOptions.host = getS3Endpoint(region);
      }
    }

    if (virtualHostStyle && !opts.pathStyle) {
      // For all hosts which support virtual host style, `bucketName`
      // is part of the hostname in the following format:
      //
      //  var host = 'bucketName.example.com'
      //
      if (bucketName) reqOptions.host = `${bucketName}.${reqOptions.host}`;
      if (objectName) reqOptions.path = `/${objectName}`;
    } else {
      // For all S3 compatible storage services we will fallback to
      // path style requests, where `bucketName` is part of the URI
      // path.
      if (bucketName) reqOptions.path = `/${bucketName}`;
      if (objectName) reqOptions.path = `/${bucketName}/${objectName}`;
    }

    if (query) reqOptions.path += `?${query}`;

    reqOptions.headers.host = reqOptions.host ?? this.host;

    if (
      (reqOptions.protocol === 'http:' && reqOptions.port !== 80) ||
      (reqOptions.protocol === 'https:' && reqOptions.port !== 443)
    ) {
      reqOptions.headers.host = `${reqOptions.host}:${reqOptions.port}`;
    }
    reqOptions.headers['user-agent'] = this.userAgent;

    // if (headers) {
    //   // have all header keys in lower case - to make signing easy
    //   _.map(headers, (v, k) => (reqOptions.headers[k.toLowerCase()] = v));
    // }

    // Use any request option specified in minioClient.setRequestOptions()
    Object.assign(reqOptions, this.reqOptions);

    return reqOptions;
  }

  async presignedUrl(
    method: string,
    bucketName: string,
    objectName: string,
    expires: number = 604800, // 7 days in seconds
    reqParams: Record<string, any> = {},
    requestDate: Date = new Date()
  ): Promise<string> {
    if (this.anonymous) {
      throw new Error(
        `Presigned ${method} url cannot be generated for anonymous requests`
      );
    }

    const query = querystring.stringify(reqParams);

    const reqOptions = this.getRequestOptions({
      method,
      region: this.region,
      bucketName,
      objectName,
      query,
    });

    try {
      const url = await presignSignatureV4(
        reqOptions,
        this.accessKey,
        this.secretKey,
        this.sessionToken,
        this.region,
        requestDate,
        expires
      );

      return url;
    } catch (pe) {
      throw pe;
    }
  }

  async presignedPutObject(
    bucketName: string,
    objectName: string,
    expires: number
  ) {
    if (!isValidBucketName(bucketName)) {
      throw new Error('Invalid bucket name: ${bucketName}');
    }
    if (!isValidObjectName(objectName)) {
      throw new Error('Invalid object name: ${objectName}');
    }
    return await this.presignedUrl('PUT', bucketName, objectName, expires);
  }

  async presignedGetObject(
    bucketName: string,
    objectName: string,
    expires: number,
    requestDate?: Date,
    respHeaders?: Record<string, string>
  ): Promise<string> {
    if (!isValidBucketName(bucketName)) {
      throw new Error(`Invalid bucket name: ${bucketName}`);
    }

    if (!isValidObjectName(objectName)) {
      throw new Error(`Invalid object name: ${objectName}`);
    }

    if (typeof respHeaders === 'function') {
      requestDate = new Date();
      respHeaders = {};
    }

    const validRespHeaders = [
      'response-content-type',
      'response-content-language',
      'response-expires',
      'response-cache-control',
      'response-content-disposition',
      'response-content-encoding',
    ];
    validRespHeaders.forEach((header) => {
      if (
        respHeaders !== undefined &&
        respHeaders[header] !== undefined &&
        typeof respHeaders[header] !== 'string'
      ) {
        throw new TypeError(
          `response header ${header} should be of type "string"`
        );
      }
    });

    return await this.presignedUrl(
      'GET',
      bucketName,
      objectName,
      expires,
      respHeaders,
      requestDate
    );
  }
}
