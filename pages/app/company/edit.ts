import { withAuth } from '@/hocs';
import dynamic from 'next/dynamic';

export const runtime = 'experimental-edge';

export default withAuth(
  dynamic(() => import('../../../screens/EditCompany'), { ssr: false })
);
