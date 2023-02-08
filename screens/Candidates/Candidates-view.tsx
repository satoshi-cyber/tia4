import { Form, LoadingProvider } from '@/components';
import Layout from '@/components/Layout';
import Title from '@/components/Title';
import React from 'react';

import { LAYOUT_PROPS, TITLE_PROPS, CLASS_NAMES } from './Candidates-constants';
import { useCandidates } from './Candidates-hook';
import EmptyScreen from './components/EmptyScreen';
import Filters from './components/Filters';
import Item from './components/Item';

export default function Jobs() {
  const { form, onSubmit, hasFilters, fetching, isListVisible, interviews } =
    useCandidates();

  return (
    <Layout.Default {...LAYOUT_PROPS}>
      <Form form={form} onSubmit={onSubmit} className={CLASS_NAMES.form}>
        <Title {...TITLE_PROPS} />
        <Filters />
        <LoadingProvider isLoading={fetching}>
          {isListVisible ? (
            <div className={CLASS_NAMES.list}>
              {interviews?.map((itemProps) => (
                <Item {...itemProps} />
              ))}
            </div>
          ) : (
            <EmptyScreen hasFilters={hasFilters} />
          )}
        </LoadingProvider>
      </Form>
    </Layout.Default>
  );
}
