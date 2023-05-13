import dynamic from 'next/dynamic';

import SkeletonField from '../SkeletonField';

export default dynamic(() => import('./TextAreaField-view'), {
  ssr: false,
  loading: () => <SkeletonField height={66} />,
});
