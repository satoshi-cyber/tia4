import dynamic from 'next/dynamic';

import SkeletonField from '../SkeletonField';

export default dynamic(() => import('./MarkdownField-view'), {
  ssr: false,
  loading: () => <SkeletonField height={295} />,
});
