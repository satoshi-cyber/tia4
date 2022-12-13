import React from 'react'
import {
  Form,
  Layout,
  FormIcon,
  Field,
  LoadingProvider,
  SubmitButton,
} from '@/components'

import { Questions, Header } from './components'
import { useCreateUpdateAJob } from './CreateEditAJob-hook'
import {
  DEADLINE_FIELD_PROPS,
  TITLE_FIELD_PROPS,
  SUBMIT_BUTTON_PROPS,
  CLASS_NAMES,
  TITLE_ICON,
} from './CreateEditAJob-constants'
import dynamic from 'next/dynamic'

const CreateAJob: React.FC = () => {
  const { handleSubmit, form, fetching, editJob, handleDeleteJob } =
    useCreateUpdateAJob()

  return (
    <Layout.Default>
      <LoadingProvider isLoading={fetching}>
        <Form form={form} onSubmit={handleSubmit} className={CLASS_NAMES.form}>
          <Header editJob={editJob} handleDeleteJob={handleDeleteJob} />
          <Field.Input
            {...TITLE_FIELD_PROPS}
            after={<FormIcon name={TITLE_ICON} />}
          />
          <Field.Input {...DEADLINE_FIELD_PROPS} />
          <Questions />
          <SubmitButton {...SUBMIT_BUTTON_PROPS} />
        </Form>
      </LoadingProvider>
    </Layout.Default>
  )
}

export default dynamic(() => Promise.resolve(CreateAJob), {
  ssr: false,
})
