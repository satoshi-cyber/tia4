import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { TOAST_OPTIONS, URLS } from '@/config';
import { useUser } from '@/hooks';
import { UseCases } from '@/useCases';
import { mutate } from 'swr';
import { upsertJobSchema } from '@/types';

import {
  TOAST_MESSAGE,
  DEFAULT_QUESTION_TIME,
  PUSH_DELAY,
} from './CreateEditAJob-constants';
import { FormSubmit } from '@/components/Form';

export const useCreateUpdateAJob = () => {
  const router = useRouter();
  const { companyId } = useUser();
  const [description, setDescription] = useState<string | null>();

  const jobId = router.query.jobId as string;

  const { data, isLoading } = UseCases.job.load(
    typeof jobId === 'string' && companyId && { companyId, id: jobId }
  );
  const { trigger: upsertJob } = UseCases.upsertJob.mutate();
  const { trigger: deleteJob } = UseCases.deleteJob.mutate();

  const handleSubmit: FormSubmit<typeof upsertJobSchema> = async (input) => {
    if (!companyId) {
      return;
    }

    const toastMessage = jobId ? TOAST_MESSAGE.EDIT_JOB : TOAST_MESSAGE.ADD_JOB;

    try {
      await upsertJob({
        ...input,
        id: jobId,
        companyId,
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
        id: jobId,
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

  const defaultData = {
    questions: [
      { id: uuidv4(), time: DEFAULT_QUESTION_TIME, question: '' },
      { id: uuidv4(), time: DEFAULT_QUESTION_TIME, question: '' },
    ],
  };

  const formProps = {
    defaultData,
    onSubmit: handleSubmit,
    schema: upsertJobSchema,
    data,
  };

  const editJob = Boolean(jobId);

  return {
    description,
    setDescription,
    editJob,
    formProps,
    handleSubmit,
    handleDeleteJob,
    isLoading,
  };
};
