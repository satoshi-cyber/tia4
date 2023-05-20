import dynamic from 'next/dynamic';

export default dynamic(() => import('./LoginButton-view'), { ssr: false });
