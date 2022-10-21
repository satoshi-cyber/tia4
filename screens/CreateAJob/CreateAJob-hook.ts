import { v4 as uuidv4 } from 'uuid';

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { createAJobSchema } from "./CreateAJob-validations";

import { NewJob, useCreateJobMutation } from "../../graphql";

export const useCreateAJob = () => {
  const [{ fetching }, execute] = useCreateJobMutation();
  const router = useRouter()

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

  const handleSubmit = async (input: NewJob) => {
    const { error } = await execute({ input })

    if (error) {
      toast.error('Error adding the job', {
        position: "top-right",
      })

      return
    }

    toast.success('Job is added', {
      position: "top-right",
    })

    router.push('/jobs')
  };

  return {
    form,
    handleSubmit,
    fetching
  };
};
