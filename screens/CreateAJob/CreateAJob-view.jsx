import React from "react";
import { useForm } from "react-hook-form";

import { Questions } from "./components/Questions/Questions-view";

import {
  Form,
  Layout,
  Title,
  FormIcon,
  PrimaryButton,
  Field,
} from "../../components";
import { useCreateJobMutation } from "../../graphql";
import { InjecHook } from "../../lib";
import { FormService } from "../../services";

const CreateAJob = () => {
  const [state, execute] = useCreateJobMutation();

  console.log(state.error);

  const form = useForm();

  const handleSubmit = (data) => {
    console.log(data);
    // execute({
    //   input: {
    //     title: "loremIpsum",
    //     deadline: "2020-05-04T14:05:23+00:00",
    //     questions: [
    //       {
    //         id: "df109bac-2ad6-4c8d-9050-3a2137cdacf6",
    //         question: "Tell me about yourself",
    //         time: 120,
    //       },
    //     ],
    //   },
    // });
  };

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
