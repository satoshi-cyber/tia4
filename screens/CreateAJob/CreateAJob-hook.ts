import { v4 as uuidv4 } from 'uuid';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { createAJobSchema } from "./CreateAJob-validations";

import { NewJob, useCreateJobMutation } from "../../graphql";

export const useCreateAJob = () => {
  const [state, execute] = useCreateJobMutation();

  console.log(state.error);

  const form = useForm<NewJob>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: yupResolver(createAJobSchema),
    defaultValues: {
      questions: [
        { id: uuidv4() },
        { id: uuidv4() }
      ]
    }
  });

  const handleSubmit = (data: NewJob) => {
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

  return {
    form,
    handleSubmit,
  };
};
