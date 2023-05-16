import dynamic from 'next/dynamic';

import SkeletonField from '../SkeletonField';

export default dynamic(() => import('./DateField-view'), {
  ssr: false,
  loading: () => <SkeletonField />,
});
