import dynamic from 'next/dynamic';

import SkeletonField from '../SkeletonField';

export default dynamic(() => import('./SelectField-view'), {
  ssr: false,
  loading: () => <SkeletonField />,
});
