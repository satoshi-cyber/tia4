import jobs from '@/useCases/jobs';
import { NextRequest, NextResponse } from 'next/server';
import { tineCtx } from 'tinejs';

export const config = {
  runtime: 'experimental-edge',
};

const handler = async (req: NextRequest) => {
  try {
    const ctx = tineCtx({ headers: req.headers, cookies: req.cookies });

    const res = await jobs.run({ ctx });

    return NextResponse.json(res);
  } catch (e) {
    return NextResponse.json({ error: e });
  }
};

export default handler;
