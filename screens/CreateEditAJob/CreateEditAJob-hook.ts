import { v4 as uuidv4 } from 'uuid';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { NewJob, useCreateJobMutation } from "@/graphql";
import { URLS } from '@/config';

import { createAJobSchema } from "./CreateEditAJob-validations";
import { ERROR_TOAST, SUCCESS_TOAST, TOAST_OPTIONS, DEFAULT_QUESTION_TIME } from './CreateEditAJob-constants';
import { CreateEditAJobProps } from './CreateEditAJob-types';

export const useCreateAJob = ({ jobId }: CreateEditAJobProps) => {
  const [{ fetching }, execute] = useCreateJobMutation();
  const router = useRouter()

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
    const { error } = await execute({ input }, { additionalTypenames: ['Job'] })

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
