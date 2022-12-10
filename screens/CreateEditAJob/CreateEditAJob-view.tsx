import React from 'react'
import {
  Form,
  Layout,
  FormIcon,
  Field,
  Loader,
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

const CreateAJob: React.FC = () => {
  const { handleSubmit, form, submitting, fetching, editJob, handleDeleteJob } =
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
          <div className="flex justify-center flex-col">
            <SubmitButton {...SUBMIT_BUTTON_PROPS} />
          </div>
        </Form>
        {submitting && <Loader />}
      </LoadingProvider>
    </Layout.Default>
  )
}

export default CreateAJob
