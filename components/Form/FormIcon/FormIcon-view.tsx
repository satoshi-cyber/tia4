import Icons from '@/components/Icons';
import SkeletonLoader from '@/components/SkeletonLoader';
import dynamic from 'next/dynamic';

import { FormIconProps } from './FormIcon-types';
import { useMemo } from 'react';

export const FormIcon: React.FC<FormIconProps> = ({ name, className }) => {
  const IconComponent = useMemo(() => {
    return (
      Icons[name as keyof typeof Icons] ??
      dynamic(
        () =>
          import(`@react-icons/all-files/hi/${name}.js`).then(
            (data) => data[name]
          ),
        {
          ssr: false,
          loading: () => (
            <SkeletonLoader className="mt-1" isLoading width={18} height={18} />
          ),
        }
      )
    );
  }, [name]);

  return (
    <div className={className}>
      <IconComponent size={18} />
    </div>
  );
};
