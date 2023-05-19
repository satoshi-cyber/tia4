import superjson from 'superjson';
import useSwr from 'swr';
import useSWRMutation from 'swr/mutation';
import { TineInferReturn, TineInferInput } from 'tinejs';
import { StatusError } from '@/types';
import type { AuthenticateUser } from './types';
import type { Company } from './types';
import type { CompanyMembers } from './types';
import type { DeleteJob } from './types';
import type { Health } from './types';
import type { Interviews } from './types';
import type { Job } from './types';
import type { Jobs } from './types';
import type { MyCompany } from './types';
import type { MyInterviews } from './types';
import type { PendingRates } from './types';
import type { Profile } from './types';
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
    getKey: () => (key: any) => key && key[0] === 'authenticateUser',
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
    getKey: () => (key: any) => key && key[0] === 'company',
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
    getKey: () => (key: any) => key && key[0] === 'companyMembers',
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
    getKey: () => (key: any) => key && key[0] === 'deleteJob',
  },
  health: {
    load: () =>
      useSwr('health', () =>
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
    getKey: () => (key: any) => key && key[0] === 'interviews',
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
    getKey: () => (key: any) => key && key[0] === 'job',
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
    getKey: () => (key: any) => key && key[0] === 'jobs',
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
    getKey: () => (key: any) => key && key[0] === 'myCompany',
  },
  myInterviews: {
    load: () =>
      useSwr('myInterviews', () =>
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
    getKey: () => (key: any) => key && key[0] === 'pendingRates',
  },
  profile: {
    load: () =>
      useSwr('profile', () =>
        fetchData<TineInferReturn<Profile>>('/api/tine/profile')
      ),
    getKey: () => 'profile',
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
    getKey: () => (key: any) => key && key[0] === 'updateProfile',
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
    getKey: () => (key: any) => key && key[0] === 'updateResume',
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
    getKey: () => (key: any) => key && key[0] === 'upsertJob',
  },
};
