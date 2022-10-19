import React from "react";
import { useForm } from "react-hook-form";

import { Questions } from "./components/Questions/Questions-view";

import {
  Form,
  Layout,
  Title,
  FormIcon,
  PrimaryButton,
  InputField,
} from "../../components";
import { useCreateJobMutation } from "../../graphql";
import { InjecHook } from "../../lib";
import { FormService } from "../../services";

const CreateAJob = () => {
  const [_, execute] = useCreateJobMutation();

  const form = useForm();

  const handleSubmit = (input) => execute({ input });

  return (
    <Layout.Default>
      <Form form={form} onSubmit={handleSubmit} className="w-full">
        <Title title="Create a job!" />
        <InputField
          name="jobTitle"
          label="Job title:"
          type="text"
          placeholder="Senior software developer"
          after={<FormIcon name="HiOutlineBriefcase" />}
        />
        <InputField
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
