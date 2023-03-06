import { RateProps } from './Rate-types';
import { ICONS } from './Rate-constants';
import { useRate } from './Rate-hook';

import Icon from '../Icon';
import SkeletonLoader from '../SkeletonLoader';
import Dialog from '../Dialog';

const Rate: React.FC<RateProps> = ({ className, size = 30 }) => {
  const { classNames, isDialogOpen, handleRate, closeDialog, score } = useRate({
    className,
  });

  return (
    <div className={classNames.container}>
      <Dialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        title="Rate"
        confirm={<Icon name={ICONS[score]} size={size} />}
      >
        This action can not be undone or edited. Candidate will not see your
        rating.
      </Dialog>
      {ICONS.map((icon, index) => (
        <SkeletonLoader
          circle
          width={size}
          height={size}
          after={
            <button
              className={classNames.button}
              onClick={() => handleRate(index)}
            >
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
