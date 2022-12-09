import React from 'react'
import {
  Form,
  Layout,
  Field,
  Loader,
  SubmitButton,
  FormIcon,
  Title,
  Text,
} from '@/components'

import {
  COMPANY_NAME_FIELD_PROPS,
  COMPANY_WEBSITE_FIELD_PROPS,
  SUBMIT_BUTTON_PROPS,
  CLASS_NAMES,
  TITLE_PROPS,
  INFO_PROPS,
} from './SetupCompany-constants'

import { useSetupCompany } from './SetupCompany-hook'

const CreateAJob: React.FC = () => {
  const { handleSubmit, form, submitting } = useSetupCompany()

  return (
    <Layout.Default>
      <Title {...TITLE_PROPS} />
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
  )
}

export default CreateAJob
