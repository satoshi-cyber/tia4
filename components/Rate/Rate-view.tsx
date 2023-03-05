import { RateProps } from './Rate-types';
import { ICONS } from './Rate-constants';
import { useRate } from './Rate-hook';

import Icon from '../Icon';
import SkeletonLoader from '../SkeletonLoader';

const Rate: React.FC<RateProps> = ({ className, size = 30 }) => {
  const { classNames } = useRate({ className });

  return (
    <div className={classNames.container}>
      {ICONS.map((icon) => (
        <SkeletonLoader
          circle
          width={size}
          height={size}
          after={
            <button className={classNames.button}>
              <Icon name={icon} size={size} />
            </button>
          }
          className={className}
        />
      ))}
    </div>
  );
};

export default Rate;
