import { withAuth } from '@/hocs';
import dynamic from 'next/dynamic';

export default withAuth(
  dynamic(() => import('../../../screens/CreateEditAJob'), { ssr: false })
);

export const runtime = 'experimental-edge';
