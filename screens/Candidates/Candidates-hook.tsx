import { useForm } from 'react-hook-form';

export const useCandidates = () => {
  const form = useForm({ defaultValues: { search: '', job: 'ALL' } });

  const onSubmit = () => {};

  const hasFilters = form.formState.isDirty;

  return {
    form,
    onSubmit,
    hasFilters,
  };
};
