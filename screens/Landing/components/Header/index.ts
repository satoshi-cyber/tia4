import dynamic from 'next/dynamic';

export default dynamic(() => import('./Header-view'), { ssr: false });
