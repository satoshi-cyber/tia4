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
  Avatar,
  Resume,
  Icon,
} from '@/components';
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
    loading,
    avatarUploadUrl,
    onUpload,
    resumeProps,
    fetchingJob,
    title,
    jobTitle,
    didApply,
  } = useApply();

  return (
    <Layout.Apply>
      <LoadingProvider isLoading={loading}>
        <Title
          {...TITLE_PROPS}
          title={title}
          subTitle={jobTitle}
          isLoading={fetchingJob}
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
          <Avatar src="/company.png" size={60} className="border" />
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
