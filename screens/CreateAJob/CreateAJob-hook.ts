import { v4 as uuidv4 } from 'uuid';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { createAJobSchema } from "./CreateAJob-validations";
import { ERROR_TOAST, SUCCESS_TOAST, TOAST_POSITION, DEFAULT_QUESTION_TIME } from './CreateAJob-constants';

import { NewJob, useCreateJobMutation } from "../../graphql";
import { URLS } from '../../config';

export const useCreateAJob = () => {
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
    const { error } = await execute({ input })

    if (error) {
      toast.error(ERROR_TOAST, {
        position: TOAST_POSITION,
      })

      return
    }

    toast.success(SUCCESS_TOAST, {
      position: TOAST_POSITION,
    })

    router.push(URLS.JOBS)
  };

  return {
    form,
    handleSubmit,
    fetching
  };
};
