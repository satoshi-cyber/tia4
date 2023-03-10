import React from 'react';

import {
  Form,
  Layout,
  Field,
  LoadingProvider,
  SubmitButton,
  Title,
  EditAvatar,
  FormIcon,
  Resume,
} from '@/components';

import {
  SUBMIT_BUTTON_PROPS,
  CLASS_NAMES,
  TITLE_PROPS,
  FIELDS,
  LINKEDIN_PROFILE_ICON,
} from './Profile-constants';

import { useProfile } from './Profile-hook';

const Profile: React.FC = () => {
  const { handleSubmit, form, fetching, resumeProps, avatarProps } =
    useProfile();

  return (
    <Layout.Default>
      <Title {...TITLE_PROPS} />
      <EditAvatar className={CLASS_NAMES.avatar} {...avatarProps} />
      <LoadingProvider isLoading={fetching}>
        <Form form={form} onSubmit={handleSubmit} className={CLASS_NAMES.form}>
          <Field.Input {...FIELDS.firstName} />
          <Field.Input {...FIELDS.lastName} />
          <Field.Input
            {...FIELDS.linkedInProfile}
            after={<FormIcon name={LINKEDIN_PROFILE_ICON} />}
          />
          <Field.TextArea {...FIELDS.bio} />
          <Resume {...resumeProps} />
          <SubmitButton {...SUBMIT_BUTTON_PROPS} />
        </Form>
      </LoadingProvider>
    </Layout.Default>
  );
};

export default Profile;
