import { Job } from '@/useCases/types';
import { formatISO } from 'date-fns';

export const formatValue = (
  job: Awaited<ReturnType<ReturnType<Job['input']>['run']>>
) => ({
  ...job,
  deadline: formatISO(new Date(job.deadline), { representation: 'date' }),
});
