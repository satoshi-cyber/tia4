import { tineAction, TineActionOptions } from 'tinejs';

const condition = tineAction(
  async <P, T = null>(
    [condition, $if, $else = null]: [boolean, P, (T | null)?],
    { parsePayload, ctx }: TineActionOptions
  ) => {
    if (await parsePayload(ctx, condition)) {
      return await parsePayload(ctx, $if);
    }

    return ((await parsePayload(ctx, $else)) ?? null) as T;
  },
  { action: 'condition', skipParse: true }
);

export default condition;
