import { StatusError } from '@/types';
import { NextRequest, NextResponse } from 'next/server';
import { tineCtx } from 'tinejs';
import authenticateUser from '@/useCases/authenticateUser';
import company from '@/useCases/company';
import companyMembers from '@/useCases/companyMembers';
import hello from '@/useCases/hello';
import interviews from '@/useCases/interviews';
import job from '@/useCases/job';
import jobs from '@/useCases/jobs';
import myInterviews from '@/useCases/myInterviews';
import profile from '@/useCases/profile';
import sign from '@/useCases/sign';

export const config = {
  runtime: 'experimental-edge',
};

const useCasesWithInput = {
  authenticateUser: authenticateUser,
  company: company,
  companyMembers: companyMembers,
  hello: hello,
  interviews: interviews,
  job: job,
  jobs: jobs,
};

const useCases = {
  myInterviews: myInterviews,
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

    return NextResponse.json({ error: e.message }, { status: 500 });
  }
};

export default handler;
