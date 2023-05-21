import React from 'react';
import Layout from '@/components/Layout';
import Title from '@/components/Title';

import { TITLE_PROPS } from './MyInterviews-constants';
import { List } from './components';

const MyInterviews = () => (
  <Layout.Default>
    <Title {...TITLE_PROPS} />
    <List />
  </Layout.Default>
);

export default MyInterviews;
