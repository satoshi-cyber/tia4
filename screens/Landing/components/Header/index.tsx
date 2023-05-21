import dynamic from 'next/dynamic';

export default dynamic(() => import('./Header-view'), {
  ssr: false,
  loading: () => <div className="w-full aspect-[967/600]" />,
});
