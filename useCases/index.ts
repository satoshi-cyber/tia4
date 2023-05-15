import useSwr from 'swr';
import useSWRMutation from 'swr/mutation';
import { TineInferReturn, TineInferInput } from 'tinejs';
import { StatusError } from '@/types';
import type { AuthenticateUser } from './types';
import type { Company } from './types';
import type { CompanyMembers } from './types';
import type { Hello } from './types';
import type { Interviews } from './types';
import type { Job } from './types';
import type { Jobs } from './types';
import type { MyInterviews } from './types';
import type { Profile } from './types';
import type { Sign } from './types';

const fetchData = <T>(url: string, body?: any) =>
  fetch(url, { method: 'POST', body: body ? JSON.stringify(body) : undefined })
    .then(async (res) => {
      if (!res.ok) {
        const error = await res.json();

        throw new StatusError(error.message, res.status);
      }

      return await res.json();
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
  hello: {
    load: (input: TineInferInput<Hello> | '' | undefined | false) =>
      useSwr(
        input ? ['hello', input] : undefined,
        input
          ? () => fetchData<TineInferReturn<Hello>>('/api/tine/hello', input)
          : () => undefined
      ),
    mutate: () =>
      useSWRMutation(
        'hello',
        (_: string, { arg }: { arg: TineInferInput<Hello> }) =>
          fetchData<TineInferReturn<Hello>>('/api/tine/hello', arg)
      ),
    getKey: () => (key: any) => key && key[0] === 'hello',
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
  myInterviews: {
    load: () =>
      useSwr('myInterviews', () =>
        fetchData<TineInferReturn<MyInterviews>>('/api/tine/myInterviews')
      ),
    getKey: () => 'myInterviews',
  },
  profile: {
    load: () =>
      useSwr('profile', () =>
        fetchData<TineInferReturn<Profile>>('/api/tine/profile')
      ),
    getKey: () => 'profile',
  },
  sign: {
    load: () =>
      useSwr('sign', () => fetchData<TineInferReturn<Sign>>('/api/tine/sign')),
    getKey: () => 'sign',
  },
};
