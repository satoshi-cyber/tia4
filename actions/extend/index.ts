import { tineAction } from 'tinejs';

const extend = tineAction(
  <P extends object, D>([data, object]: [P, D]) => {
    return Object.assign({}, data, object);
  },
  {
    action: 'extend',
  }
);

export default extend;
