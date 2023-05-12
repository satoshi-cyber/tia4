import { tineAction, TineAction, TineActionWithOptions, TineCtx } from 'tinejs';

export type SetValueAtPath<T, Path extends string, V> = Path extends keyof T
  ? { [K in keyof T]: K extends Path ? V : T[K] }
  : Path extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? {
        [L in keyof T]: L extends K ? SetValueAtPath<T[L], Rest, V> : T[L];
      }
    : T
  : { [K in keyof T]: T[K] } & Record<Path, V>;

export type ExtendedType<T, Path extends string, V> = SetValueAtPath<
  T,
  Path,
  V
>;

export default function extend<T, Path extends string, V>(options: {
  data: T[];
  path: Path;
  value:
    | ((item: T, ctx?: TineCtx) => V | Promise<V>)
    | V
    | TineAction<V>
    | ((item: T, ctx?: TineCtx) => TineAction<V>);
}): TineActionWithOptions<ExtendedType<T, Path, V>[]>;

export default function extend<T, Path extends string, V>(options: {
  data: T;
  path: Path;
  value:
    | ((item: T, ctx?: TineCtx) => V | Promise<V>)
    | V
    | TineAction<V>
    | ((item: T, ctx?: TineCtx) => TineAction<V>);
}): TineActionWithOptions<ExtendedType<T, Path, V>>;

export default function extend<T, Path extends string, V>(options: {
  data: T | T[];
  path: Path;
  value:
    | ((item: T, ctx?: TineCtx) => V | Promise<V>)
    | V
    | TineAction<V>
    | ((item: T, ctx?: TineCtx) => TineAction<V>);
}) {
  return tineAction<any, any>(
    async (_, { ctx, parsePayload }) => {
      const [data, value] = await Promise.all([
        parsePayload(ctx, options.data),
        parsePayload(ctx, options.value),
      ]);

      const baseObjects = Array.isArray(data) ? data : [data];

      const extendedObjects = await Promise.all(
        baseObjects.map(async (baseObject) => {
          const extendedObject = { ...baseObject };

          async function setValueAtPath(
            obj: any,
            pathParts: string[],
            value: any,
            ctx?: TineCtx
          ): Promise<any> {
            const [current, ...rest] = pathParts;

            if (rest.length === 0) {
              let evaluatedValue = value;

              if (typeof value === 'function') {
                evaluatedValue = await value(obj, ctx);

                if (evaluatedValue && evaluatedValue.run) {
                  evaluatedValue = await evaluatedValue.run(ctx);
                }
              } else if (evaluatedValue && evaluatedValue.run) {
                evaluatedValue = await evaluatedValue.run(ctx);
              }
              return {
                ...obj,
                [current]: evaluatedValue,
              };
            }

            return {
              ...obj,
              [current]: await setValueAtPath(
                obj[current] || {},
                rest,
                value,
                ctx
              ),
            };
          }

          const pathParts = options.path.split('.');

          return setValueAtPath(extendedObject, pathParts, value, ctx);
        })
      );

      return Array.isArray(options.data) ? extendedObjects : extendedObjects[0];
    },
    { action: 'extend', skipParse: true }
  )(options);
}
