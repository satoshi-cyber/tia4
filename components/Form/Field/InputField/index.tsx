import dynamic from 'next/dynamic';

import SkeletonField from '../SkeletonField';

export default dynamic(() => import('./InputField-view'), {
  ssr: false,
  loading: () => <SkeletonField />,
});
