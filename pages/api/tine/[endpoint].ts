import superjson from 'superjson';
import { StatusError } from '@/types';
import { NextRequest, NextResponse } from 'next/server';
import { tineCtx } from 'tinejs';
import authenticateUser from '@/useCases/authenticateUser';
import company from '@/useCases/company';
import companyMembers from '@/useCases/companyMembers';
import deleteCompany from '@/useCases/deleteCompany';
import deleteInterview from '@/useCases/deleteInterview';
import deleteInvite from '@/useCases/deleteInvite';
import deleteJob from '@/useCases/deleteJob';
import deleteMember from '@/useCases/deleteMember';
import didApply from '@/useCases/didApply';
import didRateInterview from '@/useCases/didRateInterview';
import editCompany from '@/useCases/editCompany';
import health from '@/useCases/health';
import interview from '@/useCases/interview';
import interviews from '@/useCases/interviews';
import inviteCompanyMembers from '@/useCases/inviteCompanyMembers';
import job from '@/useCases/job';
import jobs from '@/useCases/jobs';
import joinCompany from '@/useCases/joinCompany';
import markInterviewReady from '@/useCases/markInterviewReady';
import myCompany from '@/useCases/myCompany';
import myInterview from '@/useCases/myInterview';
import myInterviews from '@/useCases/myInterviews';
import pendingRates from '@/useCases/pendingRates';
import processInterview from '@/useCases/processInterview';
import profile from '@/useCases/profile';
import publicJob from '@/useCases/publicJob';
import rateInterview from '@/useCases/rateInterview';
import refreshClaims from '@/useCases/refreshClaims';
import setupCompany from '@/useCases/setupCompany';
import skipOnboarding from '@/useCases/skipOnboarding';
import submitInterview from '@/useCases/submitInterview';
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
  deleteInterview: deleteInterview,
  deleteInvite: deleteInvite,
  deleteJob: deleteJob,
  deleteMember: deleteMember,
  didApply: didApply,
  didRateInterview: didRateInterview,
  editCompany: editCompany,
  interview: interview,
  interviews: interviews,
  inviteCompanyMembers: inviteCompanyMembers,
  job: job,
  jobs: jobs,
  joinCompany: joinCompany,
  markInterviewReady: markInterviewReady,
  myCompany: myCompany,
  myInterview: myInterview,
  pendingRates: pendingRates,
  processInterview: processInterview,
  publicJob: publicJob,
  rateInterview: rateInterview,
  setupCompany: setupCompany,
  submitInterview: submitInterview,
  updateProfile: updateProfile,
  updateResume: updateResume,
  upsertJob: upsertJob,
};

const useCases = {
  health: health,
  myInterviews: myInterviews,
  profile: profile,
  refreshClaims: refreshClaims,
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
