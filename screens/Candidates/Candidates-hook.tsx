import { useInterviewsQuery } from '@/graphql';
import { useUser } from '@/hooks';
import { useForm, useWatch } from 'react-hook-form';

import { ALL_JOBS_OPTION, SKELETON_INTERVIEWS } from './Candidates-constants';

export const useCandidates = () => {
  const { companyId } = useUser();

  const form = useForm({
    defaultValues: { search: '', job: ALL_JOBS_OPTION.value },
  });

  const { job, search } = useWatch({ control: form.control });

  const jobId = job === ALL_JOBS_OPTION.value ? undefined : job;

  const [{ data, fetching }] = useInterviewsQuery({
    variables: {
      companyId: companyId!,
      filters: { jobId, query: search ? search : undefined },
    },
    pause: !companyId,
  });

  const onSubmit = () => {};

  const hasFilters = form.formState.isDirty;

  const interviews = fetching ? SKELETON_INTERVIEWS : data?.interviews;

  const isListVisible = interviews && interviews.length > 0;

  return {
    form,
    onSubmit,
    hasFilters,
    interviews,
    isListVisible,
    fetching,
  };
};
