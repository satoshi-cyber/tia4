import React from 'react';
import { Layout, Title } from '@/components';

import { TITLE_PROPS } from './MyInterviews-constants';
import { useMyInterviews } from './MyInterviews-hook';

const MyInterviews = () => {
  const { loading, myInterviews } = useMyInterviews();

  return (
    <Layout.Default>
      <Title {...TITLE_PROPS} />
      {loading && 'loading...'}
      {JSON.stringify(myInterviews)}
    </Layout.Default>
  );
};

export default MyInterviews;
