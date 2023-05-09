import { NextResponse } from 'next/server';
import querystring from 'query-string';

const signV4Algorithm = 'AWS4-HMAC-SHA256';

const isString = (arg) => {
  return typeof arg === 'string';
};

const isObject = (arg) => {
  return typeof arg === 'object' && arg !== null;
};

const isArray = (arg) => {
  return Array.isArray(arg);
};

// check if typeof arg function
const isFunction = (arg) => {
  return typeof arg === 'function';
};

const isBoolean = (arg) => {
  return typeof arg === 'boolean';
};

const isNumber = (arg) => {
  return typeof arg === 'number';
};

// check if arg is a valid date
const isValidDate = (arg) => {
  return arg instanceof Date && !isNaN(arg);
};

const uriResourceEscape = (string) => {
  return uriEscape(string).replace(/%2F/g, '/');
};

// Create a Date string with format:
// 'YYYYMMDDTHHmmss' + Z
const makeDateLong = (date) => {
  date = date || new Date();

  // Gives format like: '2017-08-07T16:28:59.889Z'
  date = date.toISOString();

  return (
    date.slice(0, 4) +
    date.slice(5, 7) +
    date.slice(8, 13) +
    date.slice(14, 16) +
    date.slice(17, 19) +
    'Z'
  );
};

const isValidPort = (port) => {
  // verify if port is a number.
  if (!isNumber(port)) return false;
  // port cannot be negative.
  if (port < 0) return false;
  // port '0' is valid and special case return true.
  if (port === 0) return true;
  var min_port = 1;
  var max_port = 65535;
  // Verify if port is in range.
  return port >= min_port && port <= max_port;
};

const isAmazonEndpoint = (endpoint) => {
  return (
    endpoint === 's3.amazonaws.com' ||
    endpoint === 's3.cn-north-1.amazonaws.com.cn'
  );
};

// isValidDomain - true if input host is a valid domain.
const isValidDomain = (host) => {
  if (!isString(host)) return false;
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
  var alphaNumerics = '`~!@#$%^&*()+={}[]|\\"\';:><?/'.split('');
  // All non alphanumeric characters are invalid.
  for (var i in alphaNumerics) {
    if (host.indexOf(alphaNumerics[i]) > -1) {
      return false;
    }
  }
  // No need to regexp match, since the list is non-exhaustive.
  // We let it be valid and fail later.
  return true;
};

const isValidIP = () => {
  return true;
};

// isValidEndpoint - true if endpoint is valid domain.
const isValidEndpoint = (endpoint) => {
  return isValidDomain(endpoint) || isValidIP(endpoint);
};

const isVirtualHostStyle = (endpoint, protocol, bucket, pathStyle) => {
  if (protocol === 'https:' && bucket.indexOf('.') > -1) {
    return false;
  }
  return isAmazonEndpoint(endpoint) || !pathStyle;
};

const isValidBucketName = (bucket) => {
  if (!isString(bucket)) return false;

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
const isValidPrefix = (prefix) => {
  if (!isString(prefix)) return false;
  if (prefix.length > 1024) return false;
  return true;
};

const isValidObjectName = (objectName) => {
  if (!isValidPrefix(objectName)) return false;
  if (objectName.length === 0) return false;
  return true;
};

const getStringToSign = async (
  canonicalRequest,
  requestDate,
  region,
  serviceName = 's3'
) => {
  if (!isString(canonicalRequest)) {
    throw new TypeError('canonicalRequest should be of type "string"');
  }
  if (!isObject(requestDate)) {
    throw new TypeError('requestDate should be of type "object"');
  }
  if (!isString(region)) {
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

// Returns signed headers array - alphabetically sorted
function getSignedHeaders(headers) {
  if (!isObject(headers)) {
    throw new TypeError('request should be of type "object"');
  }
  // Excerpts from @lsegal - https://github.com/aws/aws-sdk-js/issues/659#issuecomment-120477258
  //
  //  User-Agent:
  //
  //      This is ignored from signing because signing this causes problems with generating pre-signed URLs
  //      (that are executed by other agents) or when customers pass requests through proxies, which may
  //      modify the user-agent.
  //
  //  Content-Length:
  //
  //      This is ignored from signing because generating a pre-signed URL should not provide a content-length
  //      constraint, specifically when vending a S3 pre-signed PUT URL. The corollary to this is that when
  //      sending regular requests (non-pre-signed), the signature contains a checksum of the body, which
  //      implicitly validates the payload length (since changing the number of bytes would change the checksum)
  //      and therefore this header is not valuable in the signature.
  //
  //  Content-Type:
  //
  //      Signing this header causes quite a number of problems in browser environments, where browsers
  //      like to modify and normalize the content-type header in different ways. There is more information
  //      on this in https://github.com/aws/aws-sdk-js/issues/244. Avoiding this field simplifies logic
  //      and reduces the possibility of future bugs
  //
  //  Authorization:
  //
  //      Is skipped for obvious reasons

  const ignoredHeaders = [
    'authorization',
    'content-length',
    'content-type',
    'user-agent',
  ];

  return Object.keys(headers)
    .map((header) => header)
    .filter((header) => ignoredHeaders.indexOf(header) === -1)
    .sort();
}

const makeDateShort = (date) => {
  date = date || new Date();

  // Gives format like: '2017-08-07T16:28:59.889Z'
  date = date.toISOString();

  return date.slice(0, 4) + date.slice(5, 7) + date.slice(8, 10);
};

const getSigningKey = async (date, region, secretKey, serviceName = 's3') => {
  if (!isObject(date)) {
    throw new TypeError('date should be of type "object"');
  }
  if (!isString(region)) {
    throw new TypeError('region should be of type "string"');
  }
  if (!isString(secretKey)) {
    throw new TypeError('secretKey should be of type "string"');
  }

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

const getScope = (region, date, serviceName = 's3') => {
  return `${makeDateShort(date)}/${region}/${serviceName}/aws4_request`;
};

const getCredential = (accessKey, region, requestDate, serviceName = 's3') => {
  if (!isString(accessKey)) {
    throw new TypeError('accessKey should be of type "string"');
  }
  if (!isString(region)) {
    throw new TypeError('region should be of type "string"');
  }
  if (!isObject(requestDate)) {
    throw new TypeError('requestDate should be of type "object"');
  }
  return `${accessKey}/${getScope(region, requestDate, serviceName)}`;
};

const getCanonicalRequest = (
  method,
  path,
  headers,
  signedHeaders,
  hashedPayload
) => {
  if (!isString(method)) {
    throw new TypeError('method should be of type "string"');
  }
  if (!isString(path)) {
    throw new TypeError('path should be of type "string"');
  }
  if (!isObject(headers)) {
    throw new TypeError('headers should be of type "object"');
  }
  if (!isArray(signedHeaders)) {
    throw new TypeError('signedHeaders should be of type "array"');
  }
  if (!isString(hashedPayload)) {
    throw new TypeError('hashedPayload should be of type "string"');
  }
  const headersArray = signedHeaders.reduce((acc, i) => {
    // Trim spaces from the value (required by V4 spec)
    const val = `${headers[i]}`.replace(/ +/g, ' ');
    acc.push(`${i.toLowerCase()}:${val}`);
    return acc;
  }, []);

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

  const canonical = [];
  canonical.push(method.toUpperCase());
  canonical.push(requestResource);
  canonical.push(requestQuery);
  canonical.push(headersArray.join('\n') + '\n');
  canonical.push(signedHeaders.join(';').toLowerCase());
  canonical.push(hashedPayload);
  return canonical.join('\n');
};

const presignSignatureV4 = async (
  request,
  accessKey,
  secretKey,
  sessionToken,
  region,
  requestDate,
  expires
) => {
  if (!isObject(request)) {
    throw new TypeError('request should be of type "object"');
  }
  if (!isString(accessKey)) {
    throw new TypeError('accessKey should be of type "string"');
  }
  if (!isString(secretKey)) {
    throw new TypeError('secretKey should be of type "string"');
  }
  if (!isString(region)) {
    throw new TypeError('region should be of type "string"');
  }

  if (!accessKey) {
    throw new Error('accessKey is required for presigning');
  }
  if (!secretKey) {
    throw new Error('secretKey is required for presigning');
  }

  if (!isNumber(expires)) {
    throw new TypeError('expires should be of type "number"');
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

  const requestQuery = [];
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

  // const stringToSign = await getStringToSign(
  //   canonicalRequest,
  //   requestDate,
  //   region
  // );
  // const signingKey = await getSigningKey(requestDate, region, secretKey);
  // const signature = Crypto.createHmac('sha256', signingKey)
  //   .update(stringToSign)
  //   .digest('hex')
  //   .toLowerCase();
  // const presignedUrl =
  //   request.protocol +
  //   '//' +
  //   request.headers.host +
  //   path +
  //   `&X-Amz-Signature=${signature}`;
  // return presignedUrl;
};

const uriEscape = (string) => {
  return string.split('').reduce((acc, elem) => {
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

export class MinioClient {
  constructor(params) {
    if (typeof params.secure !== 'undefined')
      throw new Error(
        '"secure" option deprecated, "useSSL" should be used instead'
      );
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
    if (!isBoolean(params.useSSL)) {
      throw new Error(
        `Invalid useSSL flag type : ${params.useSSL}, expected to be of type "boolean"`
      );
    }

    // Validate region only if its set.
    if (params.region) {
      if (!isString(params.region)) {
        throw new Error(`Invalid region : ${params.region}`);
      }
    }

    var host = params.endPoint.toLowerCase();
    var port = params.port;
    var protocol = '';

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
    var libraryComments = `(${process.platform}; ${process.arch})`;
    var libraryAgent = `MinIO ${libraryComments} minio-js/7.0.33`;
    // User agent block ends.

    this.host = host;
    this.port = port;
    this.protocol = protocol;
    this.accessKey = params.accessKey;
    this.secretKey = params.secretKey;
    this.sessionToken = params.sessionToken;
    this.userAgent = `${libraryAgent}`;

    // Default path style is true
    if (params.pathStyle === undefined) {
      this.pathStyle = true;
    } else {
      this.pathStyle = params.pathStyle;
    }

    if (!this.accessKey) this.accessKey = '';
    if (!this.secretKey) this.secretKey = '';
    this.anonymous = !this.accessKey || !this.secretKey;

    this.regionMap = {};
    if (params.region) {
      this.region = params.region;
    }

    this.partSize = 64 * 1024 * 1024;
    if (params.partSize) {
      this.partSize = params.partSize;
      this.overRidePartSize = true;
    }
    if (this.partSize < 5 * 1024 * 1024) {
      throw new Error(`Part size should be greater than 5MB`);
    }
    if (this.partSize > 5 * 1024 * 1024 * 1024) {
      throw new Error(`Part size should be less than 5GB`);
    }

    this.maximumPartSize = 5 * 1024 * 1024 * 1024;
    this.maxObjectSize = 5 * 1024 * 1024 * 1024 * 1024;
    // SHA256 is enabled only for authenticated http requests. If the request is authenticated
    // and the connection is https we use x-amz-content-sha256=UNSIGNED-PAYLOAD
    // header for signature calculation.
    this.enableSHA256 = !this.anonymous && !params.useSSL;

    this.s3AccelerateEndpoint = params.s3AccelerateEndpoint || null;
    this.reqOptions = {};
  }

  getRequestOptions(opts) {
    var method = opts.method;
    var region = opts.region;
    var bucketName = opts.bucketName;
    var objectName = opts.objectName;
    var headers = opts.headers;
    var query = opts.query;

    var reqOptions = { method };
    reqOptions.headers = {};

    // Verify if virtual host supported.
    var virtualHostStyle;
    if (bucketName) {
      virtualHostStyle = isVirtualHostStyle(
        this.host,
        this.protocol,
        bucketName,
        this.pathStyle
      );
    }

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
    reqOptions.headers.host = reqOptions.host;
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
    reqOptions = Object.assign({}, this.reqOptions, reqOptions);

    return reqOptions;
  }

  async presignedUrl(
    method,
    bucketName,
    objectName,
    expires,
    reqParams,
    requestDate,
    cb
  ) {
    if (this.anonymous) {
      throw new Error(
        'Presigned ' +
          method +
          ' url cannot be generated for anonymous requests'
      );
    }
    if (isFunction(requestDate)) {
      cb = requestDate;
      requestDate = new Date();
    }
    if (isFunction(reqParams)) {
      cb = reqParams;
      reqParams = {};
      requestDate = new Date();
    }
    if (isFunction(expires)) {
      cb = expires;
      reqParams = {};
      expires = 24 * 60 * 60 * 7; // 7 days in seconds
      requestDate = new Date();
    }
    if (!isNumber(expires)) {
      throw new TypeError('expires should be of type "number"');
    }
    // if (!isObject(reqParams)) {
    //   throw new TypeError('reqParams should be of type "object"');
    // }
    // if (!isValidDate(requestDate)) {
    //   throw new TypeError('requestDate should be of type "Date" and valid');
    // }
    // if (!isFunction(cb)) {
    //   throw new TypeError('callback should be of type "function"');
    // }
    var query = querystring.stringify(reqParams);

    var reqOptions = this.getRequestOptions({
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
    bucketName,
    objectName,
    expires,
    respHeaders,
    requestDate,
    cb
  ) {
    if (!isValidBucketName(bucketName)) {
      throw new Error('Invalid bucket name: ' + bucketName);
    }
    if (!isValidObjectName(objectName)) {
      throw new Error(`Invalid object name: ${objectName}`);
    }

    if (isFunction(respHeaders)) {
      cb = respHeaders;
      respHeaders = {};
      requestDate = new Date();
    }

    var validRespHeaders = [
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
        !isString(respHeaders[header])
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
      requestDate,
      cb
    );
  }
}

var minioClient = new MinioClient({
  endPoint: process.env.S3_END_POINT,
  useSSL: true,
  accessKey: process.env.S3_ACCESS_KEY,
  secretKey: process.env.S3_SECRET_KEY,
  region: 'us-east-1',
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
