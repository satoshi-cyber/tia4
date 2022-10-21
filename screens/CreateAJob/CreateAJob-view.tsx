import React from "react";

import { Questions } from "./components/Questions/Questions-view";
import { useCreateAJob } from "./CreateAJob-hook";
import {
  TITLE,
  DEADLINE_FIELD_PROPS,
  TITLE_FIELD_PROPS,
  SUBMIT_BUTTON_PROPS,
} from "./CreateAJob-constants";

import {
  Form,
  Layout,
  Title,
  FormIcon,
  PrimaryButton,
  Field,
  Loader,
} from "../../components";
import { InjecHook } from "../../lib";
import { FormService } from "../../services";

const CreateAJob = () => {
  const { handleSubmit, form, fetching } = useCreateAJob();

  return (
    <Layout.Default>
      <Form form={form} onSubmit={handleSubmit} className="w-full">
        <Title title={TITLE} />
        <Field.Input
          {...TITLE_FIELD_PROPS}
          after={<FormIcon name="HiOutlineBriefcase" />}
        />
        <Field.Input {...DEADLINE_FIELD_PROPS} />
        <Questions />
        <InjecHook hookKey={[FormService.submitButton]}>
          <PrimaryButton {...SUBMIT_BUTTON_PROPS} />
        </InjecHook>
      </Form>
      {fetching && <Loader />}
    </Layout.Default>
  );
};

export default CreateAJob;
