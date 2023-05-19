import dynamic from 'next/dynamic';

export default dynamic(() => import('./Menu-view'), {
  ssr: false,
});
