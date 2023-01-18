import React from 'react';
import { Layout, Title } from '@/components';

import { TITLE_PROPS } from './MyInterviews-constants';
import { List } from './components';

const MyInterviews = () => (
  <Layout.Default>
    <Title {...TITLE_PROPS} />
    <List />
  </Layout.Default>
);

export default MyInterviews;
