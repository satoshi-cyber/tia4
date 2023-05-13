import { tineAction, TineActionOptions } from 'tinejs';

const extendArray = tineAction(
  async <P extends object, D>(
    [data, fn]: [P[], (item: P) => D],
    { parsePayload, ctx }: TineActionOptions
  ) =>
    await Promise.all(
      data.map(async (item: P) => {
        const resolvedItem = await parsePayload(ctx, fn(item));

        return Object.assign({}, item, resolvedItem);
      })
    ),
  {
    action: 'extend',
  }
);

export default extendArray;

const a = {
  name: 3,
};

const b = { ...a, ...{ name: undefined, name2: 'asd' } };
