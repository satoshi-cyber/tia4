import { Icon, Loader, LoadingProvider, SkeletonLoader } from '@/components';
import Dialog from '@/components/Dialog';

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
    fetching,
    submitting,
    value,
    handleConfirm,
  } = useRate({
    className,
  });

  return (
    <div className={classNames.container}>
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
      <LoadingProvider isLoading={fetching}>
        {value
          ? `score: ${value} / 4`
          : ICONS.map((icon, index) => (
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
      </LoadingProvider>
    </div>
  );
};

export default Rate;
