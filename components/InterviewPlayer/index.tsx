import dynamic from 'next/dynamic';
import SkeletonLoader from '@/components/SkeletonLoader';
import { CLASS_NAMES, SKELETON_PROPS } from './InterviewPlayer-constants';

export default dynamic(() => import('./InterviewPlayer-view'), {
  ssr: false,
  loading: () => (
    <div className={CLASS_NAMES.container.inline}>
      <SkeletonLoader {...SKELETON_PROPS} isLoading />
    </div>
  ),
});
