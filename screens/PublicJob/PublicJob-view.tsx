import React from 'react';

import {
  Layout,
  LoadingProvider,
  Markdown,
  PrimaryButton,
  Title,
} from '@/components';

import { TITLE_PROPS } from './PublicJob-constants';
import { usePublicJob } from './PublicJob-hook';
import dynamic from 'next/dynamic';

const PublicJob: React.FC = () => {
  const { jobTitle, companyName, fetching, handleApply, jobDescription } =
    usePublicJob();

  return (
    <Layout.Apply>
      <LoadingProvider isLoading={fetching}>
        <Title {...TITLE_PROPS} title={jobTitle} subTitle={companyName} />
        <Markdown
          className="w-full"
          text={jobDescription}
          skeletonProps={{ count: 20 }}
        />
        <PrimaryButton
          title="Apply now"
          className="w-full mt-10 sticky bottom-6"
          onClick={handleApply}
        />
      </LoadingProvider>
    </Layout.Apply>
  );
};

export default dynamic(() => Promise.resolve(PublicJob), {
  ssr: false,
});
