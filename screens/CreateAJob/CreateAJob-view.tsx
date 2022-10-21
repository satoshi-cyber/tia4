import React from "react";

import { Questions } from "./components/Questions/Questions-view";
import { useCreateAJob } from "./CreateAJob-hook";

import {
  Form,
  Layout,
  Title,
  FormIcon,
  PrimaryButton,
  Field,
} from "../../components";
import { InjecHook } from "../../lib";
import { FormService } from "../../services";

const CreateAJob = () => {
  const { handleSubmit, form } = useCreateAJob();

  return (
    <Layout.Default>
      <Form form={form} onSubmit={handleSubmit} className="w-full">
        <Title title="Create a job!" />
        <Field.Input
          name="title"
          label="Job title:"
          type="text"
          placeholder="Senior software developer"
          after={<FormIcon name="HiOutlineBriefcase" />}
        />
        <Field.Input
          label="Deadline:"
          type="date"
          name="deadline"
          placeholder="Senior software developer"
        />
        <Questions />
        <InjecHook hookKey={[FormService.submitButton]}>
          <PrimaryButton title="Submit" />
        </InjecHook>
      </Form>
    </Layout.Default>
  );
};

export default CreateAJob;
