import React from 'react';
import Layout from '@/components/Layout';
import Title from '@/components/Title';
import EditAvatar from '@/components/EditAvatar';
import LoadingProvider from '@/context/LoadingProvider';
import { Field, Form, FormIcon } from '@/components/Form';
import Resume from '@/components/Resume';
import SubmitButton from '@/components/SubmitButton';

import {
  SUBMIT_BUTTON_PROPS,
  CLASS_NAMES,
  TITLE_PROPS,
  FIELDS,
  LINKEDIN_PROFILE_ICON,
} from './Profile-constants';
import { useProfile } from './Profile-hook';

const Profile: React.FC = () => {
  const { handleSubmit, form, isLoading, resumeProps, avatarProps } =
    useProfile();

  return (
    <Layout.Default>
      <Title {...TITLE_PROPS} />
      <EditAvatar className={CLASS_NAMES.avatar} {...avatarProps} />
      <LoadingProvider isLoading={isLoading}>
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
