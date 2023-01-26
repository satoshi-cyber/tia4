import React from 'react';
import { ButtonIcon, Layout, LoadingProvider, Title } from '@/components/';
import Link from 'next/link';
import { URLS } from '@/config';
import InterviewPlayer from '@/components/InterviewPlayer';

import { TITLE_PROPS } from './MyInterview-constants';
import { useMyInterview } from './MyInterview-hook';

const MyInterviews = () => {
  const { fetching, title, subTitle, answers } = useMyInterview();

  return (
    <Layout.Default>
      <LoadingProvider isLoading={fetching}>
        <Title
          {...TITLE_PROPS}
          title={title}
          subTitle={subTitle}
          before={
            <Link href={URLS.MY_INTERVIEWS}>
              <ButtonIcon name="HiChevronLeft" />
            </Link>
          }
        />
        <InterviewPlayer answers={answers} />
      </LoadingProvider>
    </Layout.Default>
  );
};

export default MyInterviews;
