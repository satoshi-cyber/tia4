import dynamic from 'next/dynamic';
import { withAuth } from '@/hocs';

export const runtime = 'experimental-edge';

export default withAuth(
  dynamic(() => import('../../../screens/Jobs'), { ssr: false })
);
