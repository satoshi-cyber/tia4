import type { AuthenticateUser } from './types';
import type { Hello } from './types';
import type { Job } from './types';
import type { Jobs } from './types';
import type { Sign } from './types';

export const UseCases = {
  authenticateUser: {
    input: (input: Parameters<AuthenticateUser['input']>[0]) =>
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
    input: (input: Parameters<Hello['input']>[0]) =>
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
    input: (input: Parameters<Job['input']>[0]) =>
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
  jobs: [
    'jobs',
    () =>
      fetch('/api/tine/jobs', { method: 'POST' })
        .then((res) => res.json())
        .then((data) => data as Awaited<ReturnType<Jobs['run']>>),
  ] as const,
  sign: [
    'sign',
    () =>
      fetch('/api/tine/sign', { method: 'POST' })
        .then((res) => res.json())
        .then((data) => data as Awaited<ReturnType<Sign['run']>>),
  ] as const,
};
