import React from 'react';
import Layout from '@/components/Layout';
import LoadingProvider from '@/context/LoadingProvider';
import Title from '@/components/Title';
import EditAvatar from '@/components/EditAvatar';
import Icon from '@/components/Icon';
import Avatar from '@/components/Avatar';
import { Field, Form, FormIcon } from '@/components/Form';
import Resume from '@/components/Resume';
import SubmitButton from '@/components/SubmitButton';
import dynamic from 'next/dynamic';

import {
  SUBMIT_BUTTON_PROPS,
  CLASS_NAMES,
  TITLE_PROPS,
  FIELDS,
  LINKEDIN_PROFILE_ICON,
} from './Apply-constants';
import { useApply } from './Apply-hook';
import { DidApply } from './components';

const Apply: React.FC = () => {
  const {
    handleSubmit,
    form,
    avatar,
    isJobLoading,
    avatarUploadUrl,
    onUpload,
    resumeProps,
    isLoading,
    title,
    jobTitle,
    didApply,
    companyLogo,
    companyName,
  } = useApply();

  return (
    <Layout.Apply>
      <LoadingProvider isLoading={isLoading}>
        <Title
          {...TITLE_PROPS}
          title={title}
          subTitle={jobTitle}
          isLoading={isJobLoading}
        />
        <div className="flex flex-row items-center mb-6">
          <EditAvatar
            src={avatar}
            uploadUrl={avatarUploadUrl}
            onUpload={onUpload}
          />
          <Icon
            name="HiChevronRight"
            size={60}
            className="m-2 flex-none"
            isLoading={false}
          />
          <Avatar
            text={companyName}
            src={companyLogo}
            size={60}
            className="border"
            isLoading={isLoading}
          />
        </div>
        {didApply ? (
          <DidApply />
        ) : (
          <Form
            form={form}
            onSubmit={handleSubmit}
            className={CLASS_NAMES.form}
          >
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
        )}
      </LoadingProvider>
    </Layout.Apply>
  );
};

export default dynamic(() => Promise.resolve(Apply), {
  ssr: false,
});
