import dynamic from 'next/dynamic';

import SkeletonField from '../SkeletonField';

export default dynamic(() => import('./DebounceField-view'), {
  ssr: false,
  loading: () => <SkeletonField />,
});
