import React from 'react';
import { withUrqlClient } from 'next-urql';
import Link from 'next/link';
import {
  Layout,
  LoadingProvider,
  Markdown,
  PrimaryButton,
  Title,
} from '@/components';
import { GRAPHQL_URL } from '@/config';

import { TITLE_PROPS } from './PublicJob-constants';
import { usePublicJob } from './PublicJob-hook';

const PublicJob: React.FC = () => {
  const {
    jobTitle,
    companyName,
    isLoading,
    href,
    jobDescription,
    companyWebsite,
  } = usePublicJob();

  return (
    <Layout.Apply>
      <LoadingProvider isLoading={isLoading}>
        <Title
          {...TITLE_PROPS}
          title={jobTitle}
          subTitle={
            companyWebsite ? (
              <Link target="_blank" href={companyWebsite}>
                {companyName}
              </Link>
            ) : (
              companyName
            )
          }
        />
        <Markdown
          className="w-full"
          text={jobDescription}
          skeletonProps={{ count: 40 }}
        />
        <Link href={href} className="w-full mt-10 sticky bottom-6 z-20">
          <PrimaryButton title="Apply now" />
        </Link>
      </LoadingProvider>
    </Layout.Apply>
  );
};

export default withUrqlClient(
  () => ({
    url: GRAPHQL_URL,
  }),
  { ssr: true }
)(PublicJob);
