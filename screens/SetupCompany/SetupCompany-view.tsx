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
  ButtonIcon,
} from '@/components';

import {
  COMPANY_NAME_FIELD_PROPS,
  COMPANY_WEBSITE_FIELD_PROPS,
  SUBMIT_BUTTON_PROPS,
  CLASS_NAMES,
  TITLE_PROPS,
  INFO_PROPS,
} from './SetupCompany-constants';
import { useSetupCompany } from './SetupCompany-hook';
import { SetupCompanyProps } from './SetupCompany-types';

const SetupCompany: React.FC<SetupCompanyProps> = ({ showSkip }) => {
  const { handleSubmit, form, submitting, handleSkip } = useSetupCompany();

  return (
    <Layout.Default>
      <Title
        {...TITLE_PROPS}
        after={showSkip && <ButtonIcon name="HiX" onClick={handleSkip} />}
      />
      <Form form={form} onSubmit={handleSubmit} className={CLASS_NAMES.form}>
        <Field.Input {...COMPANY_NAME_FIELD_PROPS} />
        <Field.Input
          {...COMPANY_WEBSITE_FIELD_PROPS}
          after={<FormIcon name="HiOutlineLink" />}
        />
        <SubmitButton {...SUBMIT_BUTTON_PROPS} />
        <Text {...INFO_PROPS} />
      </Form>
      {submitting && <Loader />}
    </Layout.Default>
  );
};

export default SetupCompany;
