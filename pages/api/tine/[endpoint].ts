import superjson from 'superjson';
import { StatusError } from '@/types';
import { NextRequest, NextResponse } from 'next/server';
import { tineCtx } from 'tinejs';
import authenticateUser from '@/useCases/authenticateUser';
import company from '@/useCases/company';
import companyMembers from '@/useCases/companyMembers';
import deleteCompany from '@/useCases/deleteCompany';
import deleteJob from '@/useCases/deleteJob';
import editCompany from '@/useCases/editCompany';
import health from '@/useCases/health';
import interviews from '@/useCases/interviews';
import inviteCompanyMembers from '@/useCases/inviteCompanyMembers';
import job from '@/useCases/job';
import jobs from '@/useCases/jobs';
import joinCompany from '@/useCases/joinCompany';
import myCompany from '@/useCases/myCompany';
import myInterviews from '@/useCases/myInterviews';
import pendingRates from '@/useCases/pendingRates';
import profile from '@/useCases/profile';
import publicJob from '@/useCases/publicJob';
import setupCompany from '@/useCases/setupCompany';
import skipOnboarding from '@/useCases/skipOnboarding';
import updateProfile from '@/useCases/updateProfile';
import updateResume from '@/useCases/updateResume';
import upsertJob from '@/useCases/upsertJob';

export const config = {
  runtime: 'edge',
};

const useCasesWithInput = {
  authenticateUser: authenticateUser,
  company: company,
  companyMembers: companyMembers,
  deleteCompany: deleteCompany,
  deleteJob: deleteJob,
  editCompany: editCompany,
  interviews: interviews,
  inviteCompanyMembers: inviteCompanyMembers,
  job: job,
  jobs: jobs,
  joinCompany: joinCompany,
  myCompany: myCompany,
  pendingRates: pendingRates,
  publicJob: publicJob,
  setupCompany: setupCompany,
  updateProfile: updateProfile,
  updateResume: updateResume,
  upsertJob: upsertJob,
};

const useCases = {
  health: health,
  myInterviews: myInterviews,
  profile: profile,
  skipOnboarding: skipOnboarding,
};

const handler = async (req: NextRequest) => {
  try {
    const params = new URL(req.url).searchParams;

    const endpoint = params.get('endpoint') as string;

    const ctx = tineCtx({ headers: req.headers, cookies: req.cookies });

    if (endpoint in useCasesWithInput) {
      const input = superjson.deserialize(await req.json());

      const data = await useCasesWithInput[
        endpoint as keyof typeof useCasesWithInput
      ]
        .rawInput(input)
        .run(ctx);

      return NextResponse.json(superjson.serialize(data));
    }

    const data = await useCases[endpoint as keyof typeof useCases].run(ctx);

    return NextResponse.json(superjson.serialize(data));
  } catch (e: any) {
    if (e instanceof StatusError) {
      return NextResponse.json(superjson.serialize({ error: e.message }), {
        status: e.status,
      });
    }

    return NextResponse.json(superjson.serialize({ error: e.message }), {
      status: 500,
    });
  }
};

export default handler;
