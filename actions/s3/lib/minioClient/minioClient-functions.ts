import { AWS_S3_ENDPOINT, SIGN_V4_ALGORITHM } from './minioClient-constants';
import { Region, RequestOptions } from './minioClient-types';

export const uriResourceEscape = (string: string): string => {
  return uriEscape(string).replace(/%2F/g, '/');
};

// Create a Date string with format:
// 'YYYYMMDDTHHmmss' + Z
export const makeDateLong = (date?: Date): string => {
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

export const isAmazonEndpoint = (endpoint: string): boolean => {
  return (
    endpoint === 's3.amazonaws.com' ||
    endpoint === 's3.cn-north-1.amazonaws.com.cn'
  );
};

export const isValidPort = (port: number): boolean => {
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
export const isValidDomain = (host: string): boolean => {
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

export const isValidIP = (ip: string): boolean => {
  const ipRegex = /^([0-9]{1,3}\.){3}[0-9]{1,3}$/;
  return ipRegex.test(ip);
};

export const isValidEndpoint = (endpoint: string): boolean => {
  return isValidDomain(endpoint) || isValidIP(endpoint);
};

export const isVirtualHostStyle = (
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

export const isValidBucketName = (bucket: string): boolean => {
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
export const isValidPrefix = (prefix: string): boolean => {
  if (prefix.length > 1024) return false;
  return true;
};

export const isValidObjectName = (objectName: string): boolean => {
  if (!isValidPrefix(objectName)) return false;
  if (objectName.length === 0) return false;
  return true;
};

export const getStringToSign = async (
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
    SIGN_V4_ALGORITHM,
    makeDateLong(requestDate),
    scope,
    hash,
  ];

  return stringToSign.join('\n');
};

export const getSignedHeaders = (headers: Record<string, string>): string[] => {
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

export const makeDateShort = (date: Date) => {
  date = date || new Date();

  // Gives format like: '2017-08-07T16:28:59.889Z'
  const dateString = date.toISOString();

  return (
    dateString.slice(0, 4) + dateString.slice(5, 7) + dateString.slice(8, 10)
  );
};

export const getSigningKey = async (
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

export const getScope = (
  region: string,
  date: Date,
  serviceName: string = 's3'
): string => {
  return `${makeDateShort(date)}/${region}/${serviceName}/aws4_request`;
};

export const getCredential = (
  accessKey: string,
  region: string,
  requestDate: Date,
  serviceName: string = 's3'
): string => {
  return `${accessKey}/${getScope(region, requestDate, serviceName)}`;
};

export const getCanonicalRequest = (
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

export const presignSignatureV4 = async (
  request: RequestOptions,
  accessKey: string,
  secretKey: string,
  sessionToken: string,
  region: Region,
  requestDate: Date = new Date(),
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

  // requestDate = new Date();

  const iso8601Date = makeDateLong(requestDate);
  const signedHeaders = getSignedHeaders(request.headers);
  const credential = getCredential(accessKey, region, requestDate);
  const hashedPayload = 'UNSIGNED-PAYLOAD';

  const requestQuery: string[] = [];
  requestQuery.push(`X-Amz-Algorithm=${SIGN_V4_ALGORITHM}`);
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

export const uriEscape = (string: string): string => {
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

export const getS3Endpoint = (region: Region): string => {
  const endpoint = AWS_S3_ENDPOINT[region];
  if (endpoint) {
    return endpoint;
  }
  return 's3.amazonaws.com';
};
