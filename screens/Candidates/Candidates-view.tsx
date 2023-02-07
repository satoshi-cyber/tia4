import { Form } from '@/components';
import Layout from '@/components/Layout';
import Title from '@/components/Title';
import React from 'react';

import { LAYOUT_PROPS, TITLE_PROPS } from './Candidates-constants';
import { useCandidates } from './Candidates-hook';
import EmptyScreen from './components/EmptyScreen';
import Filters from './components/Filters';

export default function Jobs() {
  const { form, onSubmit, hasFilters } = useCandidates();

  return (
    <Layout.Default {...LAYOUT_PROPS}>
      <Form form={form} onSubmit={onSubmit} className="w-full">
        <Title {...TITLE_PROPS} />
        <Filters />
        <EmptyScreen hasFilters={hasFilters} />
      </Form>
    </Layout.Default>
  );
}
