import { IncomingMessage } from 'http';
import { tineCtx } from 'tinejs';

export const getTineCtx = (req: IncomingMessage) => {
  const headers = new Map(Object.entries(req.headers));

  return tineCtx({ headers });
};
