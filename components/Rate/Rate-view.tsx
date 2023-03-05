import RcRate from 'rc-rate';

import { RateProps } from './Rate-types';

import Icon from '../Icon';
import SkeletonLoader from '../SkeletonLoader';

const ICONS = [
  'FaRegFrownOpen',
  'FaRegFrown',
  'FaRegMeh',
  'FaRegSmile',
  'FaRegSmileWink',
] as const;

const Rate: React.FC<RateProps> = ({ className }) => (
  <RcRate
    character={({ index }) => (
      <SkeletonLoader
        circle
        width={30}
        height={30}
        after={<Icon name={ICONS[index as number]} />}
      />
    )}
  />
);

export default Rate;
