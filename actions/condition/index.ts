import { tineAction, TineActionOptions } from 'tinejs';

const condition = tineAction(
  async <P, T = undefined>(
    [$condition, $if, $else]: [boolean, P, T?],
    { parsePayload, ctx }: TineActionOptions
  ) => {
    if (await parsePayload(ctx, $condition)) {
      return await parsePayload(ctx, $if);
    }

    return (await parsePayload(ctx, $else)) as T;
  },
  { action: 'condition', skipParse: true }
);

export default condition;
