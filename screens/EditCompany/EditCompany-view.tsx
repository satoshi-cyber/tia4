import React from 'react';
import SettingsMenu from '@/components/SettingsMenu';
import Layout from '@/components/Layout';
import Title from '@/components/Title';
import LoadingProvider from '@/context/LoadingProvider';
import { Field, Form, FormIcon } from '@/components/Form';
import SubmitButton from '@/components/SubmitButton';
import EditAvatar from '@/components/EditAvatar';
import Loader from '@/components/Loader';

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
  const { formProps, submitting, isLoading, avatarProps, settingItems } =
    useEditCompany();

  return (
    <Layout.Default>
      <Title {...TITLE_PROPS} after={<SettingsMenu items={settingItems} />} />
      <LoadingProvider isLoading={isLoading}>
        <EditAvatar {...avatarProps} className="mb-6" />
        <Form {...formProps} className={CLASS_NAMES.form}>
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
