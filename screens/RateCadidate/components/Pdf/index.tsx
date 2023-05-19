import dynamic from 'next/dynamic';
import SkeletonLoader from '@/components/SkeletonLoader';

import { CLASS_NAMES, SKELETON_PROPS } from './Pdf-constants';

export default dynamic(() => import('./Pdf-view'), {
  ssr: false,
  loading: () => (
    <div className={CLASS_NAMES.loadingContainer}>
      <SkeletonLoader {...SKELETON_PROPS} isLoading />
    </div>
  ),
});
