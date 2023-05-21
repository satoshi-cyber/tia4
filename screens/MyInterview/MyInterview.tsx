import React from 'react';
import Footer from './components/Footer';
import Layout from '@/components/Layout';
import LoadingProvider from '@/context/LoadingProvider';
import Title from '@/components/Title';
import ButtonIcon from '@/components/ButtonIcon';
import Link from 'next/link';
import { URLS } from '@/config';
import InterviewPlayer from '@/components/InterviewPlayer';
import SettingsMenu from '@/components/SettingsMenu';

import { TITLE_PROPS } from './MyInterview-constants';
import { useMyInterview } from './MyInterview-hook';

const MyInterviews = () => {
  const {
    fetching,
    title,
    answers,
    companyLogo,
    companyName,
    appliedDate,
    settingItems,
  } = useMyInterview();

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
          after={<SettingsMenu items={settingItems} />}
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
