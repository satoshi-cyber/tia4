import React from 'react';
import { ButtonIcon, Layout, LoadingProvider, Title } from '@/components/';

import { TITLE_PROPS } from './MyInterview-constants';
import { useMyInterview } from './MyInterview-hook';
import Link from 'next/link';
import { URLS } from '@/config';

const MyInterviews = () => {
  const { data, fetching, title, subTitle } = useMyInterview();

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
        <pre>{JSON.stringify(fetching)}</pre>
        <pre>{JSON.stringify(data)}</pre>
      </LoadingProvider>
    </Layout.Default>
  );
};

export default MyInterviews;
