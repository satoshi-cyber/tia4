import React from 'react'

import {
  Form,
  Layout,
  Field,
  LoadingProvider,
  SubmitButton,
  Title,
  EditAvatar,
} from '@/components'

import {
  FIRST_NAME_FIELD_PROPS,
  LAST_NAME_FIELD_PROPS,
  SUBMIT_BUTTON_PROPS,
  CLASS_NAMES,
  TITLE_PROPS,
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
          <Field.Input {...FIRST_NAME_FIELD_PROPS} />
          <Field.Input {...LAST_NAME_FIELD_PROPS} />
          <SubmitButton {...SUBMIT_BUTTON_PROPS} />
        </Form>
      </LoadingProvider>
    </Layout.Default>
  )
}

export default Profile
