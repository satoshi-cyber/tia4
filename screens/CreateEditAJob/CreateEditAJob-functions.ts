import { Job } from '@/useCases/types';

export const formatDefaultValues = ({
  createdAt,
  updatedAt,
  companyId,
  ...job
}: Awaited<ReturnType<ReturnType<Job['input']>['run']>>) => ({
  ...job,
});
