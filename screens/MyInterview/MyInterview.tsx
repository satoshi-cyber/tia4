import React from 'react';
import { ButtonIcon, Layout, LoadingProvider, Title } from '@/components/';
import Link from 'next/link';
import { URLS } from '@/config';
import InterviewPlayer from '@/components/InterviewPlayer';

import { TITLE_PROPS } from './MyInterview-constants';
import { useMyInterview } from './MyInterview-hook';
import Footer from './components/Footer';
import SettingsMenu from './components/SettingsMenu';

const MyInterviews = () => {
  const { fetching, title, answers, companyLogo, companyName, appliedDate } =
    useMyInterview();

  return (
    <Layout.Default width="max-w-[640px]">
      <LoadingProvider isLoading={fetching}>
        <Title
          {...TITLE_PROPS}
          title={title}
          before={
            <Link href={URLS.MY_INTERVIEWS}>
              <ButtonIcon name="HiChevronLeft" />
            </Link>
          }
          after={<SettingsMenu />}
        />
        <InterviewPlayer answers={answers} />
        <Footer
          companyLogo={companyLogo}
          companyName={companyName}
          appliedDate={appliedDate}
        />
      </LoadingProvider>
    </Layout.Default>
  );
};

export default MyInterviews;
