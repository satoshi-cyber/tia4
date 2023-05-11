import { RequestCookies } from '@edge-runtime/cookies';
import job from '@/useCases/job';
import { NextRequest, NextResponse } from 'next/server';
import { tineCtx } from 'tinejs';

export const config = {
  runtime: 'experimental-edge',
};

const handler = async (req: NextRequest) => {
  try {
    const cookies = new RequestCookies(req.headers);

    const ctx = tineCtx({ headers: req.headers, cookies });

    const json = await req.json();

    const res = await job.rawInput(json).run({ ctx });

    return NextResponse.json(res);
  } catch (e: any) {
    return NextResponse.json({ error: e.message });
  }
};

export default handler;
