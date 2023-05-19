import superjson from 'superjson';
import useSwr from 'swr';
import useSWRMutation from 'swr/mutation';
import { TineInferReturn, TineInferInput } from 'tinejs';
import { StatusError } from '@/types';
import type { AuthenticateUser } from './types';
import type { Company } from './types';
import type { CompanyMembers } from './types';
import type { DeleteCompany } from './types';
import type { DeleteJob } from './types';
import type { EditCompany } from './types';
import type { Health } from './types';
import type { Interviews } from './types';
import type { InviteCompanyMembers } from './types';
import type { Job } from './types';
import type { Jobs } from './types';
import type { JoinCompany } from './types';
import type { MyCompany } from './types';
import type { MyInterviews } from './types';
import type { PendingRates } from './types';
import type { Profile } from './types';
import type { PublicJob } from './types';
import type { SetupCompany } from './types';
import type { SkipOnboarding } from './types';
import type { UpdateProfile } from './types';
import type { UpdateResume } from './types';
import type { UpsertJob } from './types';

const fetchData = <T>(url: string, body?: any) =>
  fetch(`${url}?sj=true`, {
    method: 'POST',
    body: body ? JSON.stringify(superjson.serialize(body)) : undefined,
  })
    .then(async (res) => {
      if (!res.ok) {
        const error = superjson.deserialize<{ message: string }>(
          await res.json()
        );

        throw new StatusError(error.message, res.status);
      }

      return superjson.deserialize(await res.json());
    })
    .then((data) => data as T);

export const UseCases = {
  authenticateUser: {
    load: (input: TineInferInput<AuthenticateUser> | '' | undefined | false) =>
      useSwr(
        input ? ['authenticateUser', input] : undefined,
        input
          ? () =>
              fetchData<TineInferReturn<AuthenticateUser>>(
                '/api/tine/authenticateUser',
                input
              )
          : () => undefined
      ),
    mutate: () =>
      useSWRMutation(
        'authenticateUser',
        (_: string, { arg }: { arg: TineInferInput<AuthenticateUser> }) =>
          fetchData<TineInferReturn<AuthenticateUser>>(
            '/api/tine/authenticateUser',
            arg
          )
      ),
    getKey: (input?: TineInferInput<AuthenticateUser>) => {
      if (!input) {
        return (key: any) => key && key[0] === 'authenticateUser';
      }

      return ['authenticateUser', input];
    },
  },
  company: {
    load: (input: TineInferInput<Company> | '' | undefined | false) =>
      useSwr(
        input ? ['company', input] : undefined,
        input
          ? () =>
              fetchData<TineInferReturn<Company>>('/api/tine/company', input)
          : () => undefined
      ),
    mutate: () =>
      useSWRMutation(
        'company',
        (_: string, { arg }: { arg: TineInferInput<Company> }) =>
          fetchData<TineInferReturn<Company>>('/api/tine/company', arg)
      ),
    getKey: (input?: TineInferInput<Company>) => {
      if (!input) {
        return (key: any) => key && key[0] === 'company';
      }

      return ['company', input];
    },
  },
  companyMembers: {
    load: (input: TineInferInput<CompanyMembers> | '' | undefined | false) =>
      useSwr(
        input ? ['companyMembers', input] : undefined,
        input
          ? () =>
              fetchData<TineInferReturn<CompanyMembers>>(
                '/api/tine/companyMembers',
                input
              )
          : () => undefined
      ),
    mutate: () =>
      useSWRMutation(
        'companyMembers',
        (_: string, { arg }: { arg: TineInferInput<CompanyMembers> }) =>
          fetchData<TineInferReturn<CompanyMembers>>(
            '/api/tine/companyMembers',
            arg
          )
      ),
    getKey: (input?: TineInferInput<CompanyMembers>) => {
      if (!input) {
        return (key: any) => key && key[0] === 'companyMembers';
      }

      return ['companyMembers', input];
    },
  },
  deleteCompany: {
    load: (input: TineInferInput<DeleteCompany> | '' | undefined | false) =>
      useSwr(
        input ? ['deleteCompany', input] : undefined,
        input
          ? () =>
              fetchData<TineInferReturn<DeleteCompany>>(
                '/api/tine/deleteCompany',
                input
              )
          : () => undefined
      ),
    mutate: () =>
      useSWRMutation(
        'deleteCompany',
        (_: string, { arg }: { arg: TineInferInput<DeleteCompany> }) =>
          fetchData<TineInferReturn<DeleteCompany>>(
            '/api/tine/deleteCompany',
            arg
          )
      ),
    getKey: (input?: TineInferInput<DeleteCompany>) => {
      if (!input) {
        return (key: any) => key && key[0] === 'deleteCompany';
      }

      return ['deleteCompany', input];
    },
  },
  deleteJob: {
    load: (input: TineInferInput<DeleteJob> | '' | undefined | false) =>
      useSwr(
        input ? ['deleteJob', input] : undefined,
        input
          ? () =>
              fetchData<TineInferReturn<DeleteJob>>(
                '/api/tine/deleteJob',
                input
              )
          : () => undefined
      ),
    mutate: () =>
      useSWRMutation(
        'deleteJob',
        (_: string, { arg }: { arg: TineInferInput<DeleteJob> }) =>
          fetchData<TineInferReturn<DeleteJob>>('/api/tine/deleteJob', arg)
      ),
    getKey: (input?: TineInferInput<DeleteJob>) => {
      if (!input) {
        return (key: any) => key && key[0] === 'deleteJob';
      }

      return ['deleteJob', input];
    },
  },
  editCompany: {
    load: (input: TineInferInput<EditCompany> | '' | undefined | false) =>
      useSwr(
        input ? ['editCompany', input] : undefined,
        input
          ? () =>
              fetchData<TineInferReturn<EditCompany>>(
                '/api/tine/editCompany',
                input
              )
          : () => undefined
      ),
    mutate: () =>
      useSWRMutation(
        'editCompany',
        (_: string, { arg }: { arg: TineInferInput<EditCompany> }) =>
          fetchData<TineInferReturn<EditCompany>>('/api/tine/editCompany', arg)
      ),
    getKey: (input?: TineInferInput<EditCompany>) => {
      if (!input) {
        return (key: any) => key && key[0] === 'editCompany';
      }

      return ['editCompany', input];
    },
  },
  health: {
    load: () =>
      useSwr('health', () =>
        fetchData<TineInferReturn<Health>>('/api/tine/health')
      ),
    mutate: () =>
      useSWRMutation('health', (_: string) =>
        fetchData<TineInferReturn<Health>>('/api/tine/health')
      ),
    getKey: () => 'health',
  },
  interviews: {
    load: (input: TineInferInput<Interviews> | '' | undefined | false) =>
      useSwr(
        input ? ['interviews', input] : undefined,
        input
          ? () =>
              fetchData<TineInferReturn<Interviews>>(
                '/api/tine/interviews',
                input
              )
          : () => undefined
      ),
    mutate: () =>
      useSWRMutation(
        'interviews',
        (_: string, { arg }: { arg: TineInferInput<Interviews> }) =>
          fetchData<TineInferReturn<Interviews>>('/api/tine/interviews', arg)
      ),
    getKey: (input?: TineInferInput<Interviews>) => {
      if (!input) {
        return (key: any) => key && key[0] === 'interviews';
      }

      return ['interviews', input];
    },
  },
  inviteCompanyMembers: {
    load: (
      input: TineInferInput<InviteCompanyMembers> | '' | undefined | false
    ) =>
      useSwr(
        input ? ['inviteCompanyMembers', input] : undefined,
        input
          ? () =>
              fetchData<TineInferReturn<InviteCompanyMembers>>(
                '/api/tine/inviteCompanyMembers',
                input
              )
          : () => undefined
      ),
    mutate: () =>
      useSWRMutation(
        'inviteCompanyMembers',
        (_: string, { arg }: { arg: TineInferInput<InviteCompanyMembers> }) =>
          fetchData<TineInferReturn<InviteCompanyMembers>>(
            '/api/tine/inviteCompanyMembers',
            arg
          )
      ),
    getKey: (input?: TineInferInput<InviteCompanyMembers>) => {
      if (!input) {
        return (key: any) => key && key[0] === 'inviteCompanyMembers';
      }

      return ['inviteCompanyMembers', input];
    },
  },
  job: {
    load: (input: TineInferInput<Job> | '' | undefined | false) =>
      useSwr(
        input ? ['job', input] : undefined,
        input
          ? () => fetchData<TineInferReturn<Job>>('/api/tine/job', input)
          : () => undefined
      ),
    mutate: () =>
      useSWRMutation(
        'job',
        (_: string, { arg }: { arg: TineInferInput<Job> }) =>
          fetchData<TineInferReturn<Job>>('/api/tine/job', arg)
      ),
    getKey: (input?: TineInferInput<Job>) => {
      if (!input) {
        return (key: any) => key && key[0] === 'job';
      }

      return ['job', input];
    },
  },
  jobs: {
    load: (input: TineInferInput<Jobs> | '' | undefined | false) =>
      useSwr(
        input ? ['jobs', input] : undefined,
        input
          ? () => fetchData<TineInferReturn<Jobs>>('/api/tine/jobs', input)
          : () => undefined
      ),
    mutate: () =>
      useSWRMutation(
        'jobs',
        (_: string, { arg }: { arg: TineInferInput<Jobs> }) =>
          fetchData<TineInferReturn<Jobs>>('/api/tine/jobs', arg)
      ),
    getKey: (input?: TineInferInput<Jobs>) => {
      if (!input) {
        return (key: any) => key && key[0] === 'jobs';
      }

      return ['jobs', input];
    },
  },
  joinCompany: {
    load: (input: TineInferInput<JoinCompany> | '' | undefined | false) =>
      useSwr(
        input ? ['joinCompany', input] : undefined,
        input
          ? () =>
              fetchData<TineInferReturn<JoinCompany>>(
                '/api/tine/joinCompany',
                input
              )
          : () => undefined
      ),
    mutate: () =>
      useSWRMutation(
        'joinCompany',
        (_: string, { arg }: { arg: TineInferInput<JoinCompany> }) =>
          fetchData<TineInferReturn<JoinCompany>>('/api/tine/joinCompany', arg)
      ),
    getKey: (input?: TineInferInput<JoinCompany>) => {
      if (!input) {
        return (key: any) => key && key[0] === 'joinCompany';
      }

      return ['joinCompany', input];
    },
  },
  myCompany: {
    load: (input: TineInferInput<MyCompany> | '' | undefined | false) =>
      useSwr(
        input ? ['myCompany', input] : undefined,
        input
          ? () =>
              fetchData<TineInferReturn<MyCompany>>(
                '/api/tine/myCompany',
                input
              )
          : () => undefined
      ),
    mutate: () =>
      useSWRMutation(
        'myCompany',
        (_: string, { arg }: { arg: TineInferInput<MyCompany> }) =>
          fetchData<TineInferReturn<MyCompany>>('/api/tine/myCompany', arg)
      ),
    getKey: (input?: TineInferInput<MyCompany>) => {
      if (!input) {
        return (key: any) => key && key[0] === 'myCompany';
      }

      return ['myCompany', input];
    },
  },
  myInterviews: {
    load: () =>
      useSwr('myInterviews', () =>
        fetchData<TineInferReturn<MyInterviews>>('/api/tine/myInterviews')
      ),
    mutate: () =>
      useSWRMutation('myInterviews', (_: string) =>
        fetchData<TineInferReturn<MyInterviews>>('/api/tine/myInterviews')
      ),
    getKey: () => 'myInterviews',
  },
  pendingRates: {
    load: (input: TineInferInput<PendingRates> | '' | undefined | false) =>
      useSwr(
        input ? ['pendingRates', input] : undefined,
        input
          ? () =>
              fetchData<TineInferReturn<PendingRates>>(
                '/api/tine/pendingRates',
                input
              )
          : () => undefined
      ),
    mutate: () =>
      useSWRMutation(
        'pendingRates',
        (_: string, { arg }: { arg: TineInferInput<PendingRates> }) =>
          fetchData<TineInferReturn<PendingRates>>(
            '/api/tine/pendingRates',
            arg
          )
      ),
    getKey: (input?: TineInferInput<PendingRates>) => {
      if (!input) {
        return (key: any) => key && key[0] === 'pendingRates';
      }

      return ['pendingRates', input];
    },
  },
  profile: {
    load: () =>
      useSwr('profile', () =>
        fetchData<TineInferReturn<Profile>>('/api/tine/profile')
      ),
    mutate: () =>
      useSWRMutation('profile', (_: string) =>
        fetchData<TineInferReturn<Profile>>('/api/tine/profile')
      ),
    getKey: () => 'profile',
  },
  publicJob: {
    load: (input: TineInferInput<PublicJob> | '' | undefined | false) =>
      useSwr(
        input ? ['publicJob', input] : undefined,
        input
          ? () =>
              fetchData<TineInferReturn<PublicJob>>(
                '/api/tine/publicJob',
                input
              )
          : () => undefined
      ),
    mutate: () =>
      useSWRMutation(
        'publicJob',
        (_: string, { arg }: { arg: TineInferInput<PublicJob> }) =>
          fetchData<TineInferReturn<PublicJob>>('/api/tine/publicJob', arg)
      ),
    getKey: (input?: TineInferInput<PublicJob>) => {
      if (!input) {
        return (key: any) => key && key[0] === 'publicJob';
      }

      return ['publicJob', input];
    },
  },
  setupCompany: {
    load: (input: TineInferInput<SetupCompany> | '' | undefined | false) =>
      useSwr(
        input ? ['setupCompany', input] : undefined,
        input
          ? () =>
              fetchData<TineInferReturn<SetupCompany>>(
                '/api/tine/setupCompany',
                input
              )
          : () => undefined
      ),
    mutate: () =>
      useSWRMutation(
        'setupCompany',
        (_: string, { arg }: { arg: TineInferInput<SetupCompany> }) =>
          fetchData<TineInferReturn<SetupCompany>>(
            '/api/tine/setupCompany',
            arg
          )
      ),
    getKey: (input?: TineInferInput<SetupCompany>) => {
      if (!input) {
        return (key: any) => key && key[0] === 'setupCompany';
      }

      return ['setupCompany', input];
    },
  },
  skipOnboarding: {
    load: () =>
      useSwr('skipOnboarding', () =>
        fetchData<TineInferReturn<SkipOnboarding>>('/api/tine/skipOnboarding')
      ),
    mutate: () =>
      useSWRMutation('skipOnboarding', (_: string) =>
        fetchData<TineInferReturn<SkipOnboarding>>('/api/tine/skipOnboarding')
      ),
    getKey: () => 'skipOnboarding',
  },
  updateProfile: {
    load: (input: TineInferInput<UpdateProfile> | '' | undefined | false) =>
      useSwr(
        input ? ['updateProfile', input] : undefined,
        input
          ? () =>
              fetchData<TineInferReturn<UpdateProfile>>(
                '/api/tine/updateProfile',
                input
              )
          : () => undefined
      ),
    mutate: () =>
      useSWRMutation(
        'updateProfile',
        (_: string, { arg }: { arg: TineInferInput<UpdateProfile> }) =>
          fetchData<TineInferReturn<UpdateProfile>>(
            '/api/tine/updateProfile',
            arg
          )
      ),
    getKey: (input?: TineInferInput<UpdateProfile>) => {
      if (!input) {
        return (key: any) => key && key[0] === 'updateProfile';
      }

      return ['updateProfile', input];
    },
  },
  updateResume: {
    load: (input: TineInferInput<UpdateResume> | '' | undefined | false) =>
      useSwr(
        input ? ['updateResume', input] : undefined,
        input
          ? () =>
              fetchData<TineInferReturn<UpdateResume>>(
                '/api/tine/updateResume',
                input
              )
          : () => undefined
      ),
    mutate: () =>
      useSWRMutation(
        'updateResume',
        (_: string, { arg }: { arg: TineInferInput<UpdateResume> }) =>
          fetchData<TineInferReturn<UpdateResume>>(
            '/api/tine/updateResume',
            arg
          )
      ),
    getKey: (input?: TineInferInput<UpdateResume>) => {
      if (!input) {
        return (key: any) => key && key[0] === 'updateResume';
      }

      return ['updateResume', input];
    },
  },
  upsertJob: {
    load: (input: TineInferInput<UpsertJob> | '' | undefined | false) =>
      useSwr(
        input ? ['upsertJob', input] : undefined,
        input
          ? () =>
              fetchData<TineInferReturn<UpsertJob>>(
                '/api/tine/upsertJob',
                input
              )
          : () => undefined
      ),
    mutate: () =>
      useSWRMutation(
        'upsertJob',
        (_: string, { arg }: { arg: TineInferInput<UpsertJob> }) =>
          fetchData<TineInferReturn<UpsertJob>>('/api/tine/upsertJob', arg)
      ),
    getKey: (input?: TineInferInput<UpsertJob>) => {
      if (!input) {
        return (key: any) => key && key[0] === 'upsertJob';
      }

      return ['upsertJob', input];
    },
  },
};
