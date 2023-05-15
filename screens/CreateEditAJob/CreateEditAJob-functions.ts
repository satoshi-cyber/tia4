import { Job } from '@/useCases/types';
import { formatISO } from 'date-fns';
import { TineInferReturn } from 'tinejs';

export const formatValue = (job: TineInferReturn<Job>) => ({
  ...job,
  deadline: formatISO(job.deadline, {
    representation: 'date',
  }) as unknown as Date, // default value hack
  description: job.description ?? '',
});
