import SkeletonLoader from '@/components/SkeletonLoader';
import Text from '@/components/Text';
import { SkeletonLoaderProps } from '@/components/SkeletonLoader/SkeletonLoader-types';

const SkeletonField: React.FC<SkeletonLoaderProps> = ({
  width = '100%',
  height = 44,
  className,
  ...restProps
}) => (
  <div className={`w-full mb-8 ${className}`}>
    <Text
      isLoading
      className="text-sm text-gray-700 mb-2 text-left font-medium"
      skeletonProps={{ width: 80 }}
    />
    <SkeletonLoader isLoading {...restProps} width={width} height={height} />
    <p className=" text-sm  -mt-2 text-left text overflow-hidden max-h-[0px]"></p>
  </div>
);

export default SkeletonField;
