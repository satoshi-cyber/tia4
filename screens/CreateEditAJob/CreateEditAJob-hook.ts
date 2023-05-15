import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { TOAST_OPTIONS, URLS } from '@/config';
import { useUser } from '@/hooks';

import { createAJobSchema } from './CreateEditAJob-validations';
import {
  TOAST_MESSAGE,
  DEFAULT_QUESTION_TIME,
  PUSH_DELAY,
} from './CreateEditAJob-constants';
import { UseCases } from '@/useCases';
import { mutate } from 'swr';
import { formatValue } from './CreateEditAJob-functions';

export const useCreateUpdateAJob = () => {
  const router = useRouter();
  const { companyId } = useUser();
  const [description, setDescription] = useState<string | null>();

  const { jobId } = router.query;

  const editJob = Boolean(jobId);

  const { data, isLoading } = UseCases.job.load(
    typeof jobId === 'string' && companyId && { companyId, id: jobId }
  );

  const { trigger: upsertJob } = UseCases.upsertJob.mutate();
  const { trigger: deleteJob } = UseCases.deleteJob.mutate();

  const form = useForm<Zod.infer<typeof createAJobSchema>>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(createAJobSchema),
    defaultValues: data
      ? formatValue(data)
      : {
          questions: [
            { id: uuidv4(), time: DEFAULT_QUESTION_TIME },
            { id: uuidv4(), time: DEFAULT_QUESTION_TIME },
          ],
        },
  });

  const { reset } = form;

  useEffect(() => {
    if (data) {
      reset(formatValue(data), { keepDirtyValues: true, keepDirty: true });
    }
  }, [data, reset]);

  const handleSubmit = async (input: Zod.infer<typeof createAJobSchema>) => {
    const toastMessage = editJob
      ? TOAST_MESSAGE.EDIT_JOB
      : TOAST_MESSAGE.ADD_JOB;

    try {
      console.log(input);

      await upsertJob({
        ...input,
        deadline: input.deadline.toISOString(),
        id: String(jobId),
        companyId: companyId!,
        questions: input.questions!,
      });

      mutate(UseCases.job.getKey());

      toast.success(toastMessage.success, TOAST_OPTIONS);

      setTimeout(() => router.push(URLS.JOBS), PUSH_DELAY);
    } catch (e) {
      toast.error(toastMessage.error, TOAST_OPTIONS);

      return;
    }
  };

  const handleDeleteJob = async () => {
    const toastMessage = TOAST_MESSAGE.DELETE_JOB;

    try {
      await deleteJob({
        id: String(jobId),
        companyId: companyId!,
      });

      toast.success(toastMessage.success, TOAST_OPTIONS);

      setTimeout(() => router.push(URLS.JOBS), PUSH_DELAY);
    } catch (e) {
      toast.error(toastMessage.error, TOAST_OPTIONS);
    }
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
