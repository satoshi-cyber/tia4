import { v4 as uuidv4 } from 'uuid';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { createAJobSchema } from "./CreateAJob-validations";

import { NewJob, useCreateJobMutation } from "../../graphql";

export const useCreateAJob = () => {
  const [{ fetching }, execute] = useCreateJobMutation();

  const form = useForm<NewJob>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: yupResolver(createAJobSchema),
    defaultValues: {
      questions: [
        { id: uuidv4(), time: 2000 },
        { id: uuidv4(), time: 2000 }
      ]
    }
  });

  const handleSubmit = (input: NewJob) => {
    execute({ input })
  };

  return {
    form,
    handleSubmit,
    fetching
  };
};
