import { StatusError } from '@/types';
import { NextRequest, NextResponse } from 'next/server';
import { tineCtx } from 'tinejs';
import authenticateUser from '@/useCases/authenticateUser';
import company from '@/useCases/company';
import hello from '@/useCases/hello';
import job from '@/useCases/job';
import jobs from '@/useCases/jobs';
import profile from '@/useCases/profile';
import sign from '@/useCases/sign';

export const config = {
  runtime: 'experimental-edge',
};

const useCasesWithInput = {
  authenticateUser: authenticateUser,
  company: company,
  hello: hello,
  job: job,
  jobs: jobs,
};

const useCases = {
  profile: profile,
  sign: sign,
};

const handler = async (req: NextRequest) => {
  try {
    const params = new URL(req.url).searchParams;

    const endpoint = params.get('endpoint') as string;

    const ctx = tineCtx({ headers: req.headers, cookies: req.cookies });

    if (endpoint in useCasesWithInput) {
      const json = await req.json();

      const data = await useCasesWithInput[
        endpoint as keyof typeof useCasesWithInput
      ]
        .rawInput(json)
        .run(ctx);

      return NextResponse.json(data);
    }

    const data = await useCases[endpoint as keyof typeof useCases].run(ctx);

    return NextResponse.json(data);
  } catch (e: any) {
    if (e instanceof StatusError) {
      return NextResponse.json({ error: e.message }, { status: e.status });
    }

    return NextResponse.json({ error: e.message });
  }
};

export default handler;
