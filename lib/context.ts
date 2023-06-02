import { IncomingMessage } from 'http';
import { tineCtx } from 'tinejs';

export const getTineCtx = (req: IncomingMessage) => {
  const headers = new Map();

  headers.set('X-Vercel-IP-Latitude', req.headers['x-vercel-ip-latitude']);
  headers.set('X-Vercel-IP-Longitude', req.headers['x-vercel-ip-longitude']);

  return tineCtx({ headers });
};
