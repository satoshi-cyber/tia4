import React from 'react'

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
} from '@/components'

import {
  SUBMIT_BUTTON_PROPS,
  CLASS_NAMES,
  TITLE_PROPS,
  FIELDS,
  LINKEDIN_PROFILE_ICON,
} from './Profile-constants'

import { useProfile } from './Profile-hook'

const Profile: React.FC = () => {
  const { handleSubmit, form, avatar, fetching, avatarUploadUrl, onUpload } =
    useProfile()

  return (
    <Layout.Default>
      <Title {...TITLE_PROPS} />
      <EditAvatar
        src={avatar}
        uploadUrl={avatarUploadUrl}
        onUpload={onUpload}
        className="mb-6"
      />
      <LoadingProvider isLoading={fetching}>
        <Form form={form} onSubmit={handleSubmit} className={CLASS_NAMES.form}>
          <Field.Input {...FIELDS.firstName} />
          <Field.Input {...FIELDS.lastName} />
          <Field.Input
            {...FIELDS.linkedInProfile}
            after={<FormIcon name={LINKEDIN_PROFILE_ICON} />}
          />
          <Field.TextArea {...FIELDS.bio} />
          <Resume isLoading={fetching} />
          <SubmitButton {...SUBMIT_BUTTON_PROPS} />
        </Form>
      </LoadingProvider>
    </Layout.Default>
  )
}

export default Profile
