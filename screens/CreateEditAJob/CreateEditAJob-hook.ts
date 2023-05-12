import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  NewJob,
  useCreateJobMutation,
  useDeleteJobMutation,
  useUpdateJobMutation,
} from '@/graphql';
import { TOAST_OPTIONS, URLS } from '@/config';
import { useUser } from '@/hooks';

import { createAJobSchema } from './CreateEditAJob-validations';
import {
  TOAST_MESSAGE,
  DEFAULT_QUESTION_TIME,
  PUSH_DELAY,
} from './CreateEditAJob-constants';
import useLoadData from '@/hooks/useLoadData';
import { UseCases } from '@/useCases';
import { mutate } from 'swr';

export const useCreateUpdateAJob = () => {
  const router = useRouter();
  const { companyId } = useUser();
  const [description, setDescription] = useState<string | null>();

  const { jobId } = router.query;

  const editJob = Boolean(jobId);

  const { data, isLoading } = useLoadData(
    ...UseCases.job.input(
      typeof jobId === 'string' && companyId && { companyId, id: jobId }
    )
  );

  const [, createJob] = useCreateJobMutation();
  const [, updateJob] = useUpdateJobMutation();
  const [, deleteJob] = useDeleteJobMutation();

  const form = useForm<NewJob>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: yupResolver(createAJobSchema),
    defaultValues: data
      ? data
      : {
          questions: [
            { id: uuidv4(), time: DEFAULT_QUESTION_TIME },
            { id: uuidv4(), time: DEFAULT_QUESTION_TIME },
          ],
        },
  });

  const { reset } = form;

  useEffect(() => {
    if (!isLoading && data) {
      reset(data);
    }
  }, [isLoading, reset]);

  const handleSubmit = async (input: NewJob) => {
    const { error } = editJob
      ? await updateJob(
          { input: { ...input, id: String(jobId) }, companyId: companyId! },
          { additionalTypenames: ['Job'] }
        )
      : await createJob(
          { input, companyId: companyId! },
          { additionalTypenames: ['Job'] }
        );

    mutate(UseCases.job.getKey(), undefined, true);

    const toastMessage = editJob
      ? TOAST_MESSAGE.EDIT_JOB
      : TOAST_MESSAGE.ADD_JOB;

    if (error) {
      toast.error(toastMessage.error, TOAST_OPTIONS);

      return;
    }

    toast.success(toastMessage.success, TOAST_OPTIONS);

    setTimeout(() => router.push(URLS.JOBS), PUSH_DELAY);
  };

  const handleDeleteJob = async () => {
    const { error } = await deleteJob({
      id: String(jobId),
      companyId: companyId!,
    });

    const toastMessage = TOAST_MESSAGE.DELETE_JOB;

    if (error) {
      toast.error(toastMessage.error, TOAST_OPTIONS);

      return;
    }

    toast.success(toastMessage.success, TOAST_OPTIONS);

    setTimeout(() => router.push(URLS.JOBS), PUSH_DELAY);
  };

  useEffect(() => {
    setDescription(data?.description);
  }, [data?.description]);

  return {
    description,
    setDescription,
    editJob,
    form,
    handleSubmit,
    handleDeleteJob,
    isLoading,
  };
};
