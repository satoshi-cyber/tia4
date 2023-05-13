import SkeletonLoader from '@/components/SkeletonLoader';
import Text from '@/components/Text';
import { SkeletonLoaderProps } from '@/components/SkeletonLoader/SkeletonLoader-types';

const SkeletonField: React.FC<SkeletonLoaderProps> = ({
  width = '100%',
  height = 42,
  className,
  ...restProps
}) => (
  <div className={`w-full mb-4 ${className}`}>
    <Text
      isLoading
      className="text-sm text-gray-700 mb-2 text-left font-medium"
      skeletonProps={{ width: 80 }}
    />
    <div className="mb-4">
      <SkeletonLoader isLoading {...restProps} width={width} height={height} />
    </div>
    <p className=" text-sm  -mt-2 text-left text overflow-hidden max-h-[0px]"></p>
  </div>
);

export default SkeletonField;
