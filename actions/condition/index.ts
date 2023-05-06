import { tineAction } from 'tinejs';

const condition = tineAction(
  <P, T = undefined>([condition, $if, $else = undefined]: [boolean, P, T?]) =>
    condition ? $if : $else,
  { action: 'condition' }
);

export default condition;
