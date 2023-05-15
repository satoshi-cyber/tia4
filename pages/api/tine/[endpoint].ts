import { StatusError } from '@/types';
import { NextRequest, NextResponse } from 'next/server';
import { tineCtx } from 'tinejs';
import authenticateUser from '@/useCases/authenticateUser';
import company from '@/useCases/company';
import companyMembers from '@/useCases/companyMembers';
import deleteJob from '@/useCases/deleteJob';
import health from '@/useCases/health';
import interviews from '@/useCases/interviews';
import job from '@/useCases/job';
import jobs from '@/useCases/jobs';
import myCompany from '@/useCases/myCompany';
import myInterviews from '@/useCases/myInterviews';
import profile from '@/useCases/profile';
import updateProfile from '@/useCases/updateProfile';
import upsertJob from '@/useCases/upsertJob';

export const config = {
  runtime: 'experimental-edge',
};

const useCasesWithInput = {
  authenticateUser: authenticateUser,
  company: company,
  companyMembers: companyMembers,
  deleteJob: deleteJob,
  interviews: interviews,
  job: job,
  jobs: jobs,
  myCompany: myCompany,
  updateProfile: updateProfile,
  upsertJob: upsertJob,
};

const useCases = {
  health: health,
  myInterviews: myInterviews,
  profile: profile,
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
