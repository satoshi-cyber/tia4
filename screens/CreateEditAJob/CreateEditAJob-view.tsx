import React from 'react'
import {
  Form,
  Layout,
  Title,
  FormIcon,
  PrimaryButton,
  Field,
  Loader,
} from '@/components'

import { Questions } from './components/Questions/Questions-view'
import { useCreateUpdateAJob } from './CreateEditAJob-hook'
import {
  TITLE,
  DEADLINE_FIELD_PROPS,
  TITLE_FIELD_PROPS,
  SUBMIT_BUTTON_PROPS,
  CLASS_NAMES,
  TITLE_ICON,
} from './CreateEditAJob-constants'

import { InjecHook } from '../../lib'
import { FormService } from '../../services'

const CreateAJob: React.FC = () => {
  const { handleSubmit, form, fetching } = useCreateUpdateAJob()

  return (
    <Layout.Default>
      <Form form={form} onSubmit={handleSubmit} className={CLASS_NAMES.form}>
        <Title title={TITLE} />
        <Field.Input
          {...TITLE_FIELD_PROPS}
          after={<FormIcon name={TITLE_ICON} />}
        />
        <Field.Input {...DEADLINE_FIELD_PROPS} />
        <Questions />
        <InjecHook hookKey={[FormService.submitButton]}>
          <PrimaryButton {...SUBMIT_BUTTON_PROPS} />
        </InjecHook>
      </Form>
      {fetching && <Loader />}
    </Layout.Default>
  )
}

export default CreateAJob
