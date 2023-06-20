import superjson from 'superjson';
import { StatusError } from '@/types';
import { NextApiRequest, NextApiResponse } from 'next';
import { tineCtx, workflow, TineCtx } from 'tinejs';
import { default as auth } from '@/actions/auth';
import { default as magic } from '@/actions/magic';
import { default as prisma } from '@/actions/prisma';
import { default as s3 } from '@/actions/s3';
import { default as sendMail } from '@/actions/sendMail';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const secret = req.headers['x-tine-secret'];

    if (secret !== process.env.TINE_SECRET) {
      throw new Error('Unauthorized');
    }

    const actions = new Map();
    actions.set('auth', auth);
    actions.set('magic', magic);
    actions.set('prisma', prisma);
    actions.set('s3', s3);
    actions.set('sendMail', sendMail);

    const {
      ctx = tineCtx({
        headers: new Map(Object.entries(req.headers)),
        cookies: new Map(Object.entries(req.cookies)),
      }),
      ...payload
    } = superjson.deserialize(req.body) as {
      ctx?: TineCtx;
      payload: any;
      action: string;
      name?: string;
    };

    ctx.set('.tine-workflow-actions', actions);
    ctx.set('.tine-placeholder-resolver', ($: any, key: string) =>
      new Function('$', `return ${key}`)($)
    );

    const data = await workflow(payload).run(ctx);

    return res.status(200).json(superjson.serialize(data));
  } catch (e: any) {
    if (e instanceof StatusError) {
      return res
        .status(e.status)
        .json(superjson.serialize({ error: e.message }));
    }

    return res.status(500).json(superjson.serialize({ error: e.message }));
  }
};

export default handler;
