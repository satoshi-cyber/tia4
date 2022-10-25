import { v4 as uuidv4 } from 'uuid';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { NewJob, useCreateJobMutation, useJobQuery, useUpdateJobMutation } from "@/graphql";
import { URLS } from '@/config';

import { createAJobSchema } from "./CreateEditAJob-validations";
import { TOAST_MESSAGE, TOAST_OPTIONS, DEFAULT_QUESTION_TIME } from './CreateEditAJob-constants';
import { useEffect } from 'react';
import { formatDefaultValues } from './CreateEditAJob-functions';

export const useCreateUpdateAJob = () => {
  const [{ fetching: createJobSubmitting }, createJob] = useCreateJobMutation();
  const [{ fetching: updateJobSubmitting }, updateJob] = useUpdateJobMutation()

  const submitting = createJobSubmitting || updateJobSubmitting
  const router = useRouter()

  const { jobId } = router.query

  const [{ fetching, data }] = useJobQuery({ variables: { id: String(jobId) }, pause: !Boolean(jobId) })

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

  const { reset } = form

  useEffect(() => {
    if (!fetching && data) {
      reset(formatDefaultValues(data?.job))
    }
  }, [fetching, reset])

  const handleSubmit = async (input: NewJob) => {
    const { error } = jobId ? await updateJob({ input: { ...input, id: String(jobId) } }, { additionalTypenames: ['Job'] }) : await createJob({ input }, { additionalTypenames: ['Job'] })

    const toastMessage = jobId ? TOAST_MESSAGE.EDIT_JOB : TOAST_MESSAGE.ADD_JOB

    if (error) {
      toast.error(toastMessage.error, TOAST_OPTIONS)

      return
    }

    toast.success(toastMessage.success, TOAST_OPTIONS)

    router.push(URLS.JOBS)
  };

  return {
    form,
    handleSubmit,
    fetching,
    submitting
  };
};
