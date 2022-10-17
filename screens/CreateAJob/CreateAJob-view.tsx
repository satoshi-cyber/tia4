import React from "react";

import { Questions } from "./components/Questions";

import {
  Form,
  InputField,
  Layout,
  Title,
  FormIcon,
  PrimaryButton,
} from "../../components";
import { useCreateJobMutation } from "../../graphql";
import { InjecHook } from "../../lib";
import { FormService, JobService } from "../../services";

const CreateAJob = () => {
  const [_, execute] = useCreateJobMutation()
  
  return (
  <Layout.Default>
    <Form
      className="w-full"
      hookKey={[JobService.form]}
      actionKey={[JobService.createAJob]}
    >
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
)

  };

export default CreateAJob;
