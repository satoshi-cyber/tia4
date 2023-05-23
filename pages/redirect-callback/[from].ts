import dynamic from 'next/dynamic';

export const runtime = 'experimental-edge';

export default dynamic(() => import('../../screens/RedirectCallback'), {
  ssr: false,
});
