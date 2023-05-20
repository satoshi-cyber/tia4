declare global {
  var s3map: Map<string, string>;
}

const s3map = global.s3map || new Map();

export const getS3Url = (url: string) => {
  const key = url.split('?')[0];

  if (!s3map.has(key)) {
    s3map.set(key, url);

    return url;
  }

  return s3map.get(key) as string;
};

export const removeS3Url = (url: string) => {
  const key = url.split('?')[0];

  s3map.delete(key);
};
