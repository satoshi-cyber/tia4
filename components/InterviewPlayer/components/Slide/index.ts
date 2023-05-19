import dynamic from 'next/dynamic';

export default dynamic(() => import('./Slide-view'), {
  ssr: false,
});
