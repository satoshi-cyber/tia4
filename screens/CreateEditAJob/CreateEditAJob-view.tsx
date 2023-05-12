import React from 'react';

import PostWithAI from './components/PostWithAI';
import { Questions, Header } from './components';
import { useCreateUpdateAJob } from './CreateEditAJob-hook';
import {
  DEADLINE_FIELD_PROPS,
  TITLE_FIELD_PROPS,
  SUBMIT_BUTTON_PROPS,
  CLASS_NAMES,
  TITLE_ICON,
  DESCRIPTION_FIELD_PROPS,
} from './CreateEditAJob-constants';
import dynamic from 'next/dynamic';
import Layout from '@/components/Layout';
import LoadingProvider from '@/components/LoadingProvider';
import { Field, Form, FormIcon } from '@/components/Form';
import SubmitButton from '@/components/SubmitButton';

const CreateAJob: React.FC = () => {
  const {
    handleSubmit,
    form,
    isLoading,
    editJob,
    handleDeleteJob,
    description,
    setDescription,
  } = useCreateUpdateAJob();

  return (
    <Layout.Default>
      <LoadingProvider isLoading={isLoading}>
        <Form form={form} onSubmit={handleSubmit} className={CLASS_NAMES.form}>
          <Header editJob={editJob} handleDeleteJob={handleDeleteJob} />
          {!editJob && <PostWithAI setDescription={setDescription} />}
          <Field.Input
            {...TITLE_FIELD_PROPS}
            after={<FormIcon name={TITLE_ICON} />}
          />
          <Field.Input {...DEADLINE_FIELD_PROPS} />
          <Field.MarkdownField
            {...DESCRIPTION_FIELD_PROPS}
            key={description}
            initialValue={description}
          />
          <Questions />
          <SubmitButton {...SUBMIT_BUTTON_PROPS} />
        </Form>
      </LoadingProvider>
    </Layout.Default>
  );
};

export default dynamic(() => Promise.resolve(CreateAJob), {
  ssr: false,
});
