import type { AuthenticateUser } from './types';
import type { Hello } from './types';
import type { Job } from './types';
import type { Jobs } from './types';
import type { Profile } from './types';
import type { Sign } from './types';

export const UseCases = {
  authenticateUser: {
    mutate: [
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
    ] as const,
    getKey: () => (key: any) => key[0] === 'authenticateUser',
    input: (
      input: Parameters<AuthenticateUser['input']>[0] | '' | undefined | false
    ) =>
      [
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
      ] as const,
    rawInput: (input: unknown) =>
      [
        ['authenticateUser', input],
        () =>
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
            ),
      ] as const,
  },
  hello: {
    mutate: [
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
    ] as const,
    getKey: () => (key: any) => key[0] === 'hello',
    input: (input: Parameters<Hello['input']>[0] | '' | undefined | false) =>
      [
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
      ] as const,
    rawInput: (input: unknown) =>
      [
        ['hello', input],
        () =>
          fetch('/api/tine/hello', {
            method: 'POST',
            body: JSON.stringify(input),
          })
            .then((res) => res.json())
            .then(
              (data) =>
                data as Awaited<ReturnType<ReturnType<Hello['input']>['run']>>
            ),
      ] as const,
  },
  job: {
    mutate: [
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
    ] as const,
    getKey: () => (key: any) => key[0] === 'job',
    input: (input: Parameters<Job['input']>[0] | '' | undefined | false) =>
      [
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
                    data as Awaited<ReturnType<ReturnType<Job['input']>['run']>>
                )
          : () => undefined,
      ] as const,
    rawInput: (input: unknown) =>
      [
        ['job', input],
        () =>
          fetch('/api/tine/job', {
            method: 'POST',
            body: JSON.stringify(input),
          })
            .then((res) => res.json())
            .then(
              (data) =>
                data as Awaited<ReturnType<ReturnType<Job['input']>['run']>>
            ),
      ] as const,
  },
  jobs: {
    mutate: [
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
    ] as const,
    getKey: () => (key: any) => key[0] === 'jobs',
    input: (input: Parameters<Jobs['input']>[0] | '' | undefined | false) =>
      [
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
      ] as const,
    rawInput: (input: unknown) =>
      [
        ['jobs', input],
        () =>
          fetch('/api/tine/jobs', {
            method: 'POST',
            body: JSON.stringify(input),
          })
            .then((res) => res.json())
            .then(
              (data) =>
                data as Awaited<ReturnType<ReturnType<Jobs['input']>['run']>>
            ),
      ] as const,
  },
  profile: [
    'profile',
    () =>
      fetch('/api/tine/profile', { method: 'POST' })
        .then((res) => res.json())
        .then((data) => data as Awaited<ReturnType<Profile['run']>>),
  ] as const,
  sign: [
    'sign',
    () =>
      fetch('/api/tine/sign', { method: 'POST' })
        .then((res) => res.json())
        .then((data) => data as Awaited<ReturnType<Sign['run']>>),
  ] as const,
};
