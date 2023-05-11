import { RequestCookies } from '@edge-runtime/cookies';
import sign from '@/useCases/sign';
import { NextRequest, NextResponse } from 'next/server';
import { tineCtx } from 'tinejs';

export const config = {
  runtime: 'experimental-edge',
};

const handler = async (req: NextRequest) => {
  try {
    const cookies = new RequestCookies(req.headers);

    const ctx = tineCtx({ headers: req.headers, cookies });

    const res = await sign.run({ ctx });

    return NextResponse.json(res);
  } catch (e: any) {
    return NextResponse.json({ error: e.message });
  }
};

export default handler;
