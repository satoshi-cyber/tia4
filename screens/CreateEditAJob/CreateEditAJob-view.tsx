import React from 'react'
import {
  Form,
  Layout,
  Title,
  FormIcon,
  PrimaryButton,
  Field,
  Loader,
  LoadingProvider,
  SecondaryButton,
} from '@/components'

import { Questions } from './components/Questions/Questions-view'
import { useCreateUpdateAJob } from './CreateEditAJob-hook'
import {
  DEADLINE_FIELD_PROPS,
  TITLE_FIELD_PROPS,
  SUBMIT_BUTTON_PROPS,
  DELETE_JOB_BUTTON_PROPS,
  CLASS_NAMES,
  TITLE_ICON,
} from './CreateEditAJob-constants'

import { InjecHook } from '../../lib'
import { FormService } from '../../services'

const CreateAJob: React.FC = () => {
  const {
    handleSubmit,
    form,
    submitting,
    fetching,
    title,
    editJob,
    handleDeleteJob,
  } = useCreateUpdateAJob()

  return (
    <Layout.Default>
      <LoadingProvider isLoading={fetching}>
        <Form
          form={form}
          onSubmit={handleSubmit}
          className={CLASS_NAMES.form}
          isLoading={fetching}
        >
          <Title
            title={title}
            isLoading={fetching}
            skeletonProps={{ width: 200 }}
          />
          <Field.Input
            {...TITLE_FIELD_PROPS}
            after={<FormIcon name={TITLE_ICON} />}
          />
          <Field.Input {...DEADLINE_FIELD_PROPS} />
          <Questions />
          <div className="flex justify-center flex-col">
            <InjecHook hookKey={[FormService.submitButton]}>
              <PrimaryButton {...SUBMIT_BUTTON_PROPS} />
            </InjecHook>
            {editJob && (
              <SecondaryButton
                {...DELETE_JOB_BUTTON_PROPS}
                onClick={handleDeleteJob}
              />
            )}
          </div>
        </Form>
        {submitting && <Loader />}
      </LoadingProvider>
    </Layout.Default>
  )
}

export default CreateAJob
