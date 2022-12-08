import React from 'react'
import {
  Form,
  Layout,
  PrimaryButton,
  Field,
  Loader,
  LoadingProvider,
} from '@/components'

import {
  FIRST_NAME_FIELD_PROPS,
  LAST_NAME_FIELD_PROPS,
  SUBMIT_BUTTON_PROPS,
  CLASS_NAMES,
} from './Profile-constants'

import { InjecHook } from '../../lib'
import { FormService } from '../../services'
import { useProfile } from './Profile-hook'

const CreateAJob: React.FC = () => {
  const { handleSubmit, form, submitting, fetching } = useProfile()

  return (
    <Layout.Default>
      <LoadingProvider isLoading={fetching}>
        <Form form={form} onSubmit={handleSubmit} className={CLASS_NAMES.form}>
          <Field.Input {...FIRST_NAME_FIELD_PROPS} />
          <Field.Input {...LAST_NAME_FIELD_PROPS} />
          <div className="flex justify-center flex-col">
            <InjecHook hookKey={[FormService.submitButton]}>
              <PrimaryButton {...SUBMIT_BUTTON_PROPS} />
            </InjecHook>
          </div>
        </Form>
        {submitting && <Loader />}
      </LoadingProvider>
    </Layout.Default>
  )
}

export default CreateAJob
