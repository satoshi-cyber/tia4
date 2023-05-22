import Dialog from '@/components/Dialog';
import Loader from '@/components/Loader';
import Icon from '@/components/Icon';
import LoadingProvider from '@/context/LoadingProvider';
import SkeletonLoader from '@/components/SkeletonLoader';

import { RateProps } from './Rate-types';
import { ICONS } from './Rate-constants';
import { useRate } from './Rate-hook';

const Rate: React.FC<RateProps> = ({ className, size = 30 }) => {
  const {
    classNames,
    isDialogOpen,
    handleRate,
    closeDialog,
    score,
    isLoading,
    submitting,
    isScoreVisible,
    value,
    handleConfirm,
  } = useRate({
    className,
  });

  return (
    <>
      {submitting && <Loader />}
      <Dialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        onConfirm={handleConfirm}
        title="Rate"
        confirm={<Icon name={ICONS[score]} size={size} />}
      >
        This action cannot be undone or edited. Candidate will not see your
        rating.
      </Dialog>
      <LoadingProvider isLoading={isLoading}>
        {isScoreVisible ? (
          <Icon name={ICONS[value!]} size={size} className="text-gray-400" />
        ) : (
          <div className={classNames.container}>
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
        )}
      </LoadingProvider>
    </>
  );
};

export default Rate;
