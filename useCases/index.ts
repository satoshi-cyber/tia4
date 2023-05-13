import useSwr from 'swr';
import useSWRMutation from 'swr/mutation';

import type { AuthenticateUser } from './types';
import type { Company } from './types';
import type { Hello } from './types';
import type { Job } from './types';
import type { Jobs } from './types';
import type { Profile } from './types';
import type { Sign } from './types';

export const UseCases = {
  authenticateUser: {
    load: (
      input: Parameters<AuthenticateUser['input']>[0] | '' | undefined | false
    ) =>
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
                  .then(
                    (data) =>
                      data as Awaited<
                        ReturnType<ReturnType<AuthenticateUser['input']>['run']>
                      >
                  )
            : () => undefined,
        ] as const)
      ),
    mutate: () =>
      useSWRMutation(
        ...([
          'authenticateUser',
          (
            _: string,
            { arg }: { arg: Parameters<AuthenticateUser['input']>[0] }
          ) => {
            return fetch('/api/tine/authenticateUser', {
              method: 'POST',
              body: JSON.stringify(arg),
            })
              .then((res) => res.json())
              .then(
                (data) =>
                  data as Awaited<
                    ReturnType<ReturnType<AuthenticateUser['input']>['run']>
                  >
              );
          },
        ] as const)
      ),
    getKey: () => (key: any) => key[0] === 'authenticateUser',
  },
  company: {
    load: (input: Parameters<Company['input']>[0] | '' | undefined | false) =>
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
                  .then(
                    (data) =>
                      data as Awaited<
                        ReturnType<ReturnType<Company['input']>['run']>
                      >
                  )
            : () => undefined,
        ] as const)
      ),
    mutate: () =>
      useSWRMutation(
        ...([
          'company',
          (_: string, { arg }: { arg: Parameters<Company['input']>[0] }) => {
            return fetch('/api/tine/company', {
              method: 'POST',
              body: JSON.stringify(arg),
            })
              .then((res) => res.json())
              .then(
                (data) =>
                  data as Awaited<
                    ReturnType<ReturnType<Company['input']>['run']>
                  >
              );
          },
        ] as const)
      ),
    getKey: () => (key: any) => key[0] === 'company',
  },
  hello: {
    load: (input: Parameters<Hello['input']>[0] | '' | undefined | false) =>
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
                  .then(
                    (data) =>
                      data as Awaited<
                        ReturnType<ReturnType<Hello['input']>['run']>
                      >
                  )
            : () => undefined,
        ] as const)
      ),
    mutate: () =>
      useSWRMutation(
        ...([
          'hello',
          (_: string, { arg }: { arg: Parameters<Hello['input']>[0] }) => {
            return fetch('/api/tine/hello', {
              method: 'POST',
              body: JSON.stringify(arg),
            })
              .then((res) => res.json())
              .then(
                (data) =>
                  data as Awaited<ReturnType<ReturnType<Hello['input']>['run']>>
              );
          },
        ] as const)
      ),
    getKey: () => (key: any) => key[0] === 'hello',
  },
  job: {
    load: (input: Parameters<Job['input']>[0] | '' | undefined | false) =>
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
                  .then(
                    (data) =>
                      data as Awaited<
                        ReturnType<ReturnType<Job['input']>['run']>
                      >
                  )
            : () => undefined,
        ] as const)
      ),
    mutate: () =>
      useSWRMutation(
        ...([
          'job',
          (_: string, { arg }: { arg: Parameters<Job['input']>[0] }) => {
            return fetch('/api/tine/job', {
              method: 'POST',
              body: JSON.stringify(arg),
            })
              .then((res) => res.json())
              .then(
                (data) =>
                  data as Awaited<ReturnType<ReturnType<Job['input']>['run']>>
              );
          },
        ] as const)
      ),
    getKey: () => (key: any) => key[0] === 'job',
  },
  jobs: {
    load: (input: Parameters<Jobs['input']>[0] | '' | undefined | false) =>
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
                  .then(
                    (data) =>
                      data as Awaited<
                        ReturnType<ReturnType<Jobs['input']>['run']>
                      >
                  )
            : () => undefined,
        ] as const)
      ),
    mutate: () =>
      useSWRMutation(
        ...([
          'jobs',
          (_: string, { arg }: { arg: Parameters<Jobs['input']>[0] }) => {
            return fetch('/api/tine/jobs', {
              method: 'POST',
              body: JSON.stringify(arg),
            })
              .then((res) => res.json())
              .then(
                (data) =>
                  data as Awaited<ReturnType<ReturnType<Jobs['input']>['run']>>
              );
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
              .then((data) => data as Awaited<ReturnType<Profile['run']>>),
        ] as const)
      ),
    getKey: () => (key: any) => key[0] === 'profile',
  },
  sign: {
    load: () =>
      useSwr(
        ...([
          'sign',
          () =>
            fetch('/api/tine/sign', { method: 'POST' })
              .then((res) => res.json())
              .then((data) => data as Awaited<ReturnType<Sign['run']>>),
        ] as const)
      ),
    getKey: () => (key: any) => key[0] === 'sign',
  },
};
