import dynamic from 'next/dynamic';

export default dynamic(() => import('../../screens/RedirectCallback'), { ssr: false })
