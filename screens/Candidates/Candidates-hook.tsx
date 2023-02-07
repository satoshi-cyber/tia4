import { useForm } from 'react-hook-form';
import { ALL_JOBS_OPTION } from './Candidates-constants';

export const useCandidates = () => {
  const form = useForm({
    defaultValues: { search: '', job: ALL_JOBS_OPTION.value },
  });

  const onSubmit = () => {};

  const hasFilters = form.formState.isDirty;

  return {
    form,
    onSubmit,
    hasFilters,
  };
};
