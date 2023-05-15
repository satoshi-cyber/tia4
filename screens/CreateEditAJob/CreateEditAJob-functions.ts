import { Job } from '@/useCases/types';
import { formatISO } from 'date-fns';
import { TineInferReturn } from 'tinejs';

export const formatValue = (job: TineInferReturn<Job>) => ({
  ...job,
  deadline: formatISO(new Date(job.deadline), {
    representation: 'date',
  }) as unknown as Date,
  description: job.description ?? '',
});
