import useSwr from 'swr';
import useSWRMutation from 'swr/mutation';
import { TineInferReturn, TineInferInput } from 'tinejs';
import type { AuthenticateUser } from './types';
import type { Company } from './types';
import type { Hello } from './types';
import type { Interviews } from './types';
import type { Job } from './types';
import type { Jobs } from './types';
import type { Profile } from './types';
import type { Sign } from './types';

export const UseCases = {
  authenticateUser: {
    load: (input: TineInferInput<AuthenticateUser> | '' | undefined | false) =>
      useSwr(
        ...([
          input ? ['authenticateUser', input] : undefined,
          input
            ? () =>
                fetch('/api/tine/authenticateUser', {
                  method: 'POST',
                  body: JSON.stringify(input),
                })
                  .then((res) => res.json())
                  .then((data) => data as TineInferReturn<AuthenticateUser>)
            : () => undefined,
        ] as const)
      ),
    mutate: () =>
      useSWRMutation(
        ...([
          'authenticateUser',
          (_: string, { arg }: { arg: TineInferInput<AuthenticateUser> }) => {
            return fetch('/api/tine/authenticateUser', {
              method: 'POST',
              body: JSON.stringify(arg),
            })
              .then((res) => res.json())
              .then((data) => data as TineInferReturn<AuthenticateUser>);
          },
        ] as const)
      ),
    getKey: () => (key: any) => key[0] === 'authenticateUser',
  },
  company: {
    load: (input: TineInferInput<Company> | '' | undefined | false) =>
      useSwr(
        ...([
          input ? ['company', input] : undefined,
          input
            ? () =>
                fetch('/api/tine/company', {
                  method: 'POST',
                  body: JSON.stringify(input),
                })
                  .then((res) => res.json())
                  .then((data) => data as TineInferReturn<Company>)
            : () => undefined,
        ] as const)
      ),
    mutate: () =>
      useSWRMutation(
        ...([
          'company',
          (_: string, { arg }: { arg: TineInferInput<Company> }) => {
            return fetch('/api/tine/company', {
              method: 'POST',
              body: JSON.stringify(arg),
            })
              .then((res) => res.json())
              .then((data) => data as TineInferReturn<Company>);
          },
        ] as const)
      ),
    getKey: () => (key: any) => key[0] === 'company',
  },
  hello: {
    load: (input: TineInferInput<Hello> | '' | undefined | false) =>
      useSwr(
        ...([
          input ? ['hello', input] : undefined,
          input
            ? () =>
                fetch('/api/tine/hello', {
                  method: 'POST',
                  body: JSON.stringify(input),
                })
                  .then((res) => res.json())
                  .then((data) => data as TineInferReturn<Hello>)
            : () => undefined,
        ] as const)
      ),
    mutate: () =>
      useSWRMutation(
        ...([
          'hello',
          (_: string, { arg }: { arg: TineInferInput<Hello> }) => {
            return fetch('/api/tine/hello', {
              method: 'POST',
              body: JSON.stringify(arg),
            })
              .then((res) => res.json())
              .then((data) => data as TineInferReturn<Hello>);
          },
        ] as const)
      ),
    getKey: () => (key: any) => key[0] === 'hello',
  },
  interviews: {
    load: (input: TineInferInput<Interviews> | '' | undefined | false) =>
      useSwr(
        ...([
          input ? ['interviews', input] : undefined,
          input
            ? () =>
                fetch('/api/tine/interviews', {
                  method: 'POST',
                  body: JSON.stringify(input),
                })
                  .then((res) => res.json())
                  .then((data) => data as TineInferReturn<Interviews>)
            : () => undefined,
        ] as const)
      ),
    mutate: () =>
      useSWRMutation(
        ...([
          'interviews',
          (_: string, { arg }: { arg: TineInferInput<Interviews> }) => {
            return fetch('/api/tine/interviews', {
              method: 'POST',
              body: JSON.stringify(arg),
            })
              .then((res) => res.json())
              .then((data) => data as TineInferReturn<Interviews>);
          },
        ] as const)
      ),
    getKey: () => (key: any) => key[0] === 'interviews',
  },
  job: {
    load: (input: TineInferInput<Job> | '' | undefined | false) =>
      useSwr(
        ...([
          input ? ['job', input] : undefined,
          input
            ? () =>
                fetch('/api/tine/job', {
                  method: 'POST',
                  body: JSON.stringify(input),
                })
                  .then((res) => res.json())
                  .then((data) => data as TineInferReturn<Job>)
            : () => undefined,
        ] as const)
      ),
    mutate: () =>
      useSWRMutation(
        ...([
          'job',
          (_: string, { arg }: { arg: TineInferInput<Job> }) => {
            return fetch('/api/tine/job', {
              method: 'POST',
              body: JSON.stringify(arg),
            })
              .then((res) => res.json())
              .then((data) => data as TineInferReturn<Job>);
          },
        ] as const)
      ),
    getKey: () => (key: any) => key[0] === 'job',
  },
  jobs: {
    load: (input: TineInferInput<Jobs> | '' | undefined | false) =>
      useSwr(
        ...([
          input ? ['jobs', input] : undefined,
          input
            ? () =>
                fetch('/api/tine/jobs', {
                  method: 'POST',
                  body: JSON.stringify(input),
                })
                  .then((res) => res.json())
                  .then((data) => data as TineInferReturn<Jobs>)
            : () => undefined,
        ] as const)
      ),
    mutate: () =>
      useSWRMutation(
        ...([
          'jobs',
          (_: string, { arg }: { arg: TineInferInput<Jobs> }) => {
            return fetch('/api/tine/jobs', {
              method: 'POST',
              body: JSON.stringify(arg),
            })
              .then((res) => res.json())
              .then((data) => data as TineInferReturn<Jobs>);
          },
        ] as const)
      ),
    getKey: () => (key: any) => key[0] === 'jobs',
  },
  profile: {
    load: () =>
      useSwr(
        ...([
          'profile',
          () =>
            fetch('/api/tine/profile', { method: 'POST' })
              .then((res) => res.json())
              .then((data) => data as TineInferReturn<Profile>),
        ] as const)
      ),
    getKey: () => 'profile',
  },
  sign: {
    load: () =>
      useSwr(
        ...([
          'sign',
          () =>
            fetch('/api/tine/sign', { method: 'POST' })
              .then((res) => res.json())
              .then((data) => data as TineInferReturn<Sign>),
        ] as const)
      ),
    getKey: () => 'sign',
  },
};
