import type { AuthenticateUser } from './types';
import type { Hello } from './types';
import type { Jobs } from './types';

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
  jobs: {
    input: (input: Parameters<Jobs['input']>[0]) =>
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
};
