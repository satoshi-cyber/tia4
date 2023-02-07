import Layout from '@/components/Layout';
import Title from '@/components/Title';
import React from 'react';

import { LAYOUT_PROPS, TITLE_PROPS } from './Candidates-constants';
import EmptyScreen from './components/EmptyScreen';

export default function Jobs() {
  return (
    <Layout.Default {...LAYOUT_PROPS}>
      <Title {...TITLE_PROPS} />
      <EmptyScreen />
    </Layout.Default>
  );
}
