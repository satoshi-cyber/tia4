import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '@/components/Layout';
import LoadingProvider from '@/context/LoadingProvider';
import Title from '@/components/Title';
import Markdown from '@/components/Markdown';
import PrimaryButton from '@/components/PrimaryButton';
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
        <Head>
          <title>{`${companyName} - ${jobTitle}`}</title>
          {jobDescription && (
            <meta
              name="description"
              content={jobDescription.substring(0, 200)}
            />
          )}
        </Head>
        <Title
          {...TITLE_PROPS}
          title={jobTitle}
          subTitle={
            companyWebsite ? (
              <Link target="_blank" href={companyWebsite} className="underline">
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
        <Link
          href={href}
          className="w-full mt-10 sticky bottom-6 z-20"
          prefetch={false}
        >
          <PrimaryButton title="Apply now" />
        </Link>
      </LoadingProvider>
    </Layout.Apply>
  );
};

export default PublicJob;
