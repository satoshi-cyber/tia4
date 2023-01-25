import React from 'react';
import {
  Form,
  Layout,
  Field,
  Loader,
  SubmitButton,
  FormIcon,
  Title,
  Text,
  LoadingProvider,
} from '@/components';

import {
  COMPANY_NAME_FIELD_PROPS,
  COMPANY_WEBSITE_FIELD_PROPS,
  SUBMIT_BUTTON_PROPS,
  CLASS_NAMES,
  TITLE_PROPS,
  COMPANY_DESCRIPTION_PROPS,
} from './EditCompany-constants';

import { useEditCompany } from './EditCompany-hook';

const EditCompany: React.FC = () => {
  const { handleSubmit, form, submitting, fetching } = useEditCompany();

  return (
    <Layout.Default>
      <Title {...TITLE_PROPS} />
      <LoadingProvider isLoading={fetching}>
        <Form form={form} onSubmit={handleSubmit} className={CLASS_NAMES.form}>
          <Field.Input {...COMPANY_NAME_FIELD_PROPS} />
          <Field.Input
            {...COMPANY_WEBSITE_FIELD_PROPS}
            after={<FormIcon name="HiOutlineLink" />}
          />
          <Field.TextArea {...COMPANY_DESCRIPTION_PROPS} />
          <SubmitButton {...SUBMIT_BUTTON_PROPS} />
        </Form>
        {submitting && <Loader />}
      </LoadingProvider>
    </Layout.Default>
  );
};

export default EditCompany;
