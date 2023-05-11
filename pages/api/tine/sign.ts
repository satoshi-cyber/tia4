import sign from '@/useCases/sign';
import { NextRequest, NextResponse } from 'next/server';
import { tineCtx } from 'tinejs';

export const config = {
  runtime: 'experimental-edge',
};

const handler = async (req: NextRequest) => {
  try {
    const ctx = tineCtx({ headers: req.headers, cookies: req.cookies });

    const data = await sign.run({ ctx });

    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e.message });
  }
};

export default handler;
