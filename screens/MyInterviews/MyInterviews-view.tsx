import React from 'react';
import { Layout, Title } from '@/components';

import { TITLE_PROPS } from './MyInterviews-constants';

const MyInterviews = () => {
  return (
    <Layout.Default>
      <Title {...TITLE_PROPS} />
    </Layout.Default>
  );
};

export default MyInterviews;
