import type { Hello } from './types';
import type { Jobs } from './types';

export const UseCases = {
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
