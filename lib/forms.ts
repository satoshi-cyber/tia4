import { z } from 'zod';

type RecursivelyReplaceNullWithUndefined<T> = T extends null
  ? undefined // Note: Add interfaces here of all GraphQL scalars that will be transformed into an object
  : T extends DataTransfer
  ? T
  : {
      [K in keyof T]: T[K] extends (infer U)[]
        ? RecursivelyReplaceNullWithUndefined<U>[]
        : RecursivelyReplaceNullWithUndefined<T[K]>;
    };

type DeepNullable<T> = {
  [K in keyof T]: DeepNullable<T[K]> | null;
};

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export function replaceNullsWithUndefineds<T extends object>(
  obj: T
): RecursivelyReplaceNullWithUndefined<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const newObj: any = {};
  Object.keys(obj).forEach((k) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const v: any = (obj as any)[k];
    newObj[k as keyof T] =
      v === null
        ? undefined
        : // eslint-disable-next-line no-proto
        v && typeof v === 'object' && v.__proto__.constructor === Object
        ? replaceNullsWithUndefineds(v)
        : v;
  });
  return newObj;
}

export const makeParseDefaults =
  <D extends z.AnyZodObject>(schema: D) =>
  (data: DeepPartial<DeepNullable<z.infer<typeof schema>>> | undefined) => {
    if (!data) {
      return undefined;
    }

    const undefiendData = replaceNullsWithUndefineds(data);

    return schema.deepPartial().parse(undefiendData);
  };
