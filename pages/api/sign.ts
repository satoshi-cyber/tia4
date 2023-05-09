import { NextResponse } from 'next/server';
import querystring from 'query-string';

const signV4Algorithm = 'AWS4-HMAC-SHA256';

const uriResourceEscape = (string: string): string => {
  return uriEscape(string).replace(/%2F/g, '/');
};

// Create a Date string with format:
// 'YYYYMMDDTHHmmss' + Z
const makeDateLong = (date?: Date): string => {
  date = date || new Date();

  // Gives format like: '2017-08-07T16:28:59.889Z'
  const dateString = date.toISOString();

  return (
    dateString.slice(0, 4) +
    dateString.slice(5, 7) +
    dateString.slice(8, 13) +
    dateString.slice(14, 16) +
    dateString.slice(17, 19) +
    'Z'
  );
};

const isAmazonEndpoint = (endpoint: string): boolean => {
  return (
    endpoint === 's3.amazonaws.com' ||
    endpoint === 's3.cn-north-1.amazonaws.com.cn'
  );
};

const isValidPort = (port: number): boolean => {
  // port cannot be negative.
  if (port < 0) return false;
  // port '0' is valid and special case return true.
  if (port === 0) return true;
  const min_port = 1;
  const max_port = 65535;
  // Verify if port is in range.
  return port >= min_port && port <= max_port;
};

// isValidDomain - true if input host is a valid domain.
const isValidDomain = (host: string): boolean => {
  // See RFC 1035, RFC 3696.
  if (host.length === 0 || host.length > 255) {
    return false;
  }
  // Host cannot start or end with a '-'
  if (host[0] === '-' || host.slice(-1) === '-') {
    return false;
  }
  // Host cannot start or end with a '_'
  if (host[0] === '_' || host.slice(-1) === '_') {
    return false;
  }
  // Host cannot start with a '.'
  if (host[0] === '.') {
    return false;
  }
  const alphaNumerics = '`~!@#$%^&*()+={}[]|\\"\';:><?/'.split('');
  // All non alphanumeric characters are invalid.
  for (const i in alphaNumerics) {
    if (host.indexOf(alphaNumerics[i]) > -1) {
      return false;
    }
  }
  // No need to regexp match, since the list is non-exhaustive.
  // We let it be valid and fail later.
  return true;
};

const isValidIP = (ip: string): boolean => {
  const ipRegex = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
  return ipRegex.test(ip);
};

const isValidEndpoint = (endpoint: string): boolean => {
  return isValidDomain(endpoint) || isValidIP(endpoint);
};

const isVirtualHostStyle = (
  endpoint: string,
  protocol: string,
  bucket: string,
  pathStyle: boolean
): boolean => {
  if (protocol === 'https:' && bucket.indexOf('.') > -1) {
    return false;
  }
  return isAmazonEndpoint(endpoint) || !pathStyle;
};

const isValidBucketName = (bucket: string): boolean => {
  // bucket length should be less than and no more than 63
  // characters long.
  if (bucket.length < 3 || bucket.length > 63) {
    return false;
  }
  // bucket with successive periods is invalid.
  if (bucket.indexOf('..') > -1) {
    return false;
  }
  // bucket cannot have ip address style.
  if (bucket.match(/[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+/)) {
    return false;
  }
  // bucket should begin with alphabet/number and end with alphabet/number,
  // with alphabet/number/.- in the middle.
  if (bucket.match(/^[a-z0-9][a-z0-9.-]+[a-z0-9]$/)) {
    return true;
  }
  return false;
};

// check if prefix is valid
const isValidPrefix = (prefix: string): boolean => {
  if (prefix.length > 1024) return false;
  return true;
};

const isValidObjectName = (objectName: string): boolean => {
  if (!isValidPrefix(objectName)) return false;
  if (objectName.length === 0) return false;
  return true;
};

const getStringToSign = async (
  canonicalRequest: string,
  requestDate: Date,
  region: Region,
  serviceName: string = 's3'
): Promise<string> => {
  if (typeof canonicalRequest !== 'string') {
    throw new TypeError('canonicalRequest should be of type "string"');
  }
  if (!(requestDate instanceof Date)) {
    throw new TypeError('requestDate should be of type "Date"');
  }
  if (typeof region !== 'string') {
    throw new TypeError('region should be of type "string"');
  }

  const encoder = new TextEncoder();
  const hash = await crypto.subtle
    .digest('SHA-256', encoder.encode(canonicalRequest))
    .then((bytes) =>
      Array.from(new Uint8Array(bytes))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')
    );

  const scope = getScope(region, requestDate, serviceName);
  const stringToSign = [
    signV4Algorithm,
    makeDateLong(requestDate),
    scope,
    hash,
  ];

  return stringToSign.join('\n');
};

const getSignedHeaders = (headers: Record<string, string>): string[] => {
  const ignoredHeaders = [
    'authorization',
    'content-length',
    'content-type',
    'user-agent',
  ];

  return Object.keys(headers)
    .map((header) => header.toLowerCase())
    .filter((header) => ignoredHeaders.indexOf(header) === -1)
    .sort();
};

const makeDateShort = (date: Date) => {
  date = date || new Date();

  // Gives format like: '2017-08-07T16:28:59.889Z'
  const dateString = date.toISOString();

  return (
    dateString.slice(0, 4) + dateString.slice(5, 7) + dateString.slice(8, 10)
  );
};

const getSigningKey = async (
  date: Date,
  region: string,
  secretKey: string,
  serviceName = 's3'
): Promise<ArrayBuffer> => {
  const encoder = new TextEncoder();
  const dateLine = makeDateShort(date);
  const message1 = encoder.encode('AWS4' + secretKey);
  const message2 = encoder.encode(dateLine);
  const message3 = encoder.encode(region);
  const message4 = encoder.encode(serviceName);
  const message5 = encoder.encode('aws4_request');

  const hmac1 = await crypto.subtle
    .importKey(
      'raw',
      message1,
      { name: 'HMAC', hash: { name: 'SHA-256' } },
      false,
      ['sign']
    )
    .then((key) => crypto.subtle.sign('HMAC', key, message2));

  const hmac2 = await crypto.subtle
    .importKey(
      'raw',
      hmac1,
      { name: 'HMAC', hash: { name: 'SHA-256' } },
      false,
      ['sign']
    )
    .then((key) => crypto.subtle.sign('HMAC', key, message3));

  const hmac3 = await crypto.subtle
    .importKey(
      'raw',
      hmac2,
      { name: 'HMAC', hash: { name: 'SHA-256' } },
      false,
      ['sign']
    )
    .then((key) => crypto.subtle.sign('HMAC', key, message4));

  return await crypto.subtle
    .importKey(
      'raw',
      hmac3,
      { name: 'HMAC', hash: { name: 'SHA-256' } },
      false,
      ['sign']
    )
    .then((key) => crypto.subtle.sign('HMAC', key, message5));
};

const getScope = (
  region: string,
  date: Date,
  serviceName: string = 's3'
): string => {
  return `${makeDateShort(date)}/${region}/${serviceName}/aws4_request`;
};

const getCredential = (
  accessKey: string,
  region: string,
  requestDate: Date,
  serviceName: string = 's3'
): string => {
  return `${accessKey}/${getScope(region, requestDate, serviceName)}`;
};

const getCanonicalRequest = (
  method: string,
  path: string,
  headers: Record<string, any>,
  signedHeaders: string[],
  hashedPayload: string
): string => {
  const headersArray = signedHeaders.reduce((acc, i) => {
    // Trim spaces from the value (required by V4 spec)
    const val = `${headers[i]}`.replace(/ +/g, ' ');
    acc.push(`${i.toLowerCase()}:${val}`);
    return acc;
  }, [] as string[]);

  const requestResource = path.split('?')[0];
  let requestQuery = path.split('?')[1];
  if (!requestQuery) requestQuery = '';

  if (requestQuery) {
    requestQuery = requestQuery
      .split('&')
      .sort()
      .map((element) => (element.indexOf('=') === -1 ? element + '=' : element))
      .join('&');
  }

  const canonical: string[] = [];
  canonical.push(method.toUpperCase());
  canonical.push(requestResource);
  canonical.push(requestQuery);
  canonical.push(headersArray.join('\n') + '\n');
  canonical.push(signedHeaders.join(';').toLowerCase());
  canonical.push(hashedPayload);
  return canonical.join('\n');
};

const presignSignatureV4 = async (
  request: RequestOptions,
  accessKey: string,
  secretKey: string,
  sessionToken: string,
  region: Region,
  requestDate: Date,
  expires: number
): Promise<string> => {
  if (!accessKey) {
    throw new Error('accessKey is required for presigning');
  }
  if (!secretKey) {
    throw new Error('secretKey is required for presigning');
  }

  if (expires < 1) {
    throw new Error('expires param cannot be less than 1 seconds');
  }
  if (expires > 604800) {
    throw new Error('expires param cannot be greater than 7 days');
  }

  requestDate = new Date();

  const iso8601Date = makeDateLong(requestDate);
  const signedHeaders = getSignedHeaders(request.headers);
  const credential = getCredential(accessKey, region, requestDate);
  const hashedPayload = 'UNSIGNED-PAYLOAD';

  const requestQuery: string[] = [];
  requestQuery.push(`X-Amz-Algorithm=${signV4Algorithm}`);
  requestQuery.push(`X-Amz-Credential=${uriEscape(credential)}`);
  requestQuery.push(`X-Amz-Date=${iso8601Date}`);
  requestQuery.push(`X-Amz-Expires=${expires}`);
  requestQuery.push(
    `X-Amz-SignedHeaders=${uriEscape(signedHeaders.join(';').toLowerCase())}`
  );
  if (sessionToken) {
    requestQuery.push(`X-Amz-Security-Token=${uriEscape(sessionToken)}`);
  }

  const resource = request.path.split('?')[0];
  let query = request.path.split('?')[1];
  if (query) {
    query = query + '&' + requestQuery.join('&');
  } else {
    query = requestQuery.join('&');
  }

  const path = resource + '?' + query;

  const canonicalRequest = getCanonicalRequest(
    request.method,
    path,
    request.headers,
    signedHeaders,
    hashedPayload
  );

  const encoder = new TextEncoder();

  const stringToSign = await getStringToSign(
    canonicalRequest,
    requestDate,
    region
  );
  const signingKey = await getSigningKey(requestDate, region, secretKey);

  const key = await crypto.subtle.importKey(
    'raw',
    signingKey,
    { name: 'HMAC', hash: { name: 'SHA-256' } },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign(
    { name: 'HMAC' },
    key,
    encoder.encode(stringToSign)
  );

  const signatureHex = Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');

  const presignedUrl =
    request.protocol +
    '//' +
    request.headers.host +
    path +
    `&X-Amz-Signature=${signatureHex}`;

  return presignedUrl;
};

const uriEscape = (string: string): string => {
  return string.split('').reduce((acc: string, elem: string) => {
    let buf = Buffer.from(elem);
    if (buf.length === 1) {
      // length 1 indicates that elem is not a unicode character.
      // Check if it is an unreserved characer.
      if (
        ('A' <= elem && elem <= 'Z') ||
        ('a' <= elem && elem <= 'z') ||
        ('0' <= elem && elem <= '9') ||
        elem === '_' ||
        elem === '.' ||
        elem === '~' ||
        elem === '-'
      ) {
        // Unreserved characer should not be encoded.
        acc = acc + elem;
        return acc;
      }
    }
    // elem needs encoding - i.e elem should be encoded if it's not unreserved
    // character or if it's a unicode character.
    for (var i = 0; i < buf.length; i++) {
      acc = acc + '%' + buf[i].toString(16).toUpperCase();
    }
    return acc;
  }, '');
};

const AWS_S3_ENDPOINT = {
  'us-east-1': 's3.amazonaws.com',
  'us-east-2': 's3-us-east-2.amazonaws.com',
  'us-west-1': 's3-us-west-1.amazonaws.com',
  'us-west-2': 's3-us-west-2.amazonaws.com',
  'ca-central-1': 's3.ca-central-1.amazonaws.com',
  'eu-west-1': 's3-eu-west-1.amazonaws.com',
  'eu-west-2': 's3-eu-west-2.amazonaws.com',
  'eu-east-1': 's3-eu-east-1.amazonaws.com',
  'sa-east-1': 's3-sa-east-1.amazonaws.com',
  'eu-central-1': 's3-eu-central-1.amazonaws.com',
  'ap-south-1': 's3-ap-south-1.amazonaws.com',
  'ap-southeast-1': 's3-ap-southeast-1.amazonaws.com',
  'ap-southeast-2': 's3-ap-southeast-2.amazonaws.com',
  'ap-northeast-1': 's3-ap-northeast-1.amazonaws.com',
  'cn-north-1': 's3.cn-north-1.amazonaws.com.cn',
  'ap-east-1': 's3.ap-east-1.amazonaws.com',
  // Add new endpoints here.
};

type Region = keyof typeof AWS_S3_ENDPOINT;

const getS3Endpoint = (region: Region): string => {
  if (typeof region !== 'string') {
    throw new TypeError(`Invalid region: ${region}`);
  }
  const endpoint = AWS_S3_ENDPOINT[region];
  if (endpoint) {
    return endpoint;
  }
  return 's3.amazonaws.com';
};

interface MinioClientParams {
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

interface RequestOptions {
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
    const headers = opts.headers;
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

  async presignedGetObject(
    bucketName: string,
    objectName: string,
    expires: number,
    respHeaders?: Record<string, string>,
    requestDate?: Date
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

var minioClient = new MinioClient({
  endPoint: process.env.S3_END_POINT!,
  useSSL: true,
  accessKey: process.env.S3_ACCESS_KEY,
  secretKey: process.env.S3_SECRET_KEY,
  region: 'eu-east-1',
});

export const config = {
  runtime: 'experimental-edge',
};

export default async () => {
  const presignedUrl = await minioClient.presignedGetObject(
    'company-avatars',
    'c94e9f76-ee01-4de8-8c5d-8a625c914775.jpg',
    3600
  );

  return NextResponse.json({ presignedUrl });
};
