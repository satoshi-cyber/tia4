import React from 'react'
import {
  Form,
  Layout,
  Field,
  Loader,
  LoadingProvider,
  SubmitButton,
} from '@/components'

import {
  FIRST_NAME_FIELD_PROPS,
  LAST_NAME_FIELD_PROPS,
  SUBMIT_BUTTON_PROPS,
  CLASS_NAMES,
} from './Profile-constants'

import { useProfile } from './Profile-hook'

const CreateAJob: React.FC = () => {
  const { handleSubmit, form, submitting, fetching } = useProfile()

  return (
    <Layout.Default>
      <LoadingProvider isLoading={fetching}>
        <Form form={form} onSubmit={handleSubmit} className={CLASS_NAMES.form}>
          <Field.Input {...FIRST_NAME_FIELD_PROPS} />
          <Field.Input {...LAST_NAME_FIELD_PROPS} />
          <SubmitButton {...SUBMIT_BUTTON_PROPS} />
        </Form>
        {submitting && <Loader />}
      </LoadingProvider>
    </Layout.Default>
  )
}

export default CreateAJob
