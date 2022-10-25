import { v4 as uuidv4 } from 'uuid';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { NewJob, useCreateJobMutation, useUpdateJobMutation } from "@/graphql";
import { URLS } from '@/config';

import { createAJobSchema } from "./CreateEditAJob-validations";
import { ERROR_TOAST, SUCCESS_TOAST, TOAST_OPTIONS, DEFAULT_QUESTION_TIME } from './CreateEditAJob-constants';

export const useCreateUpdateAJob = () => {
  const [{ fetching: createJobFetching }, createJob] = useCreateJobMutation();
  const [{ fetching: updateJobFetching }, updateJob] = useUpdateJobMutation()

  const fetching = createJobFetching || updateJobFetching
  const router = useRouter()

  const { jobId } = router.query

  console.log({ jobId })

  const form = useForm<NewJob>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: yupResolver(createAJobSchema),
    defaultValues: {
      questions: [
        { id: uuidv4(), time: DEFAULT_QUESTION_TIME },
        { id: uuidv4(), time: DEFAULT_QUESTION_TIME }
      ]
    }
  });

  const handleSubmit = async (input: NewJob) => {
    const { error } = await createJob({ input }, { additionalTypenames: ['Job'] })

    if (error) {
      toast.error(ERROR_TOAST, TOAST_OPTIONS)

      return
    }

    toast.success(SUCCESS_TOAST, TOAST_OPTIONS)

    router.push(URLS.JOBS)
  };

  return {
    form,
    handleSubmit,
    fetching
  };
};
