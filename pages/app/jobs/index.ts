import dynamic from 'next/dynamic';
import { withAuth } from '@/hocs';

export default withAuth(
  dynamic(() => import('../../../screens/Jobs'), { ssr: false })
);

export const runtime = 'experimental-edge';
