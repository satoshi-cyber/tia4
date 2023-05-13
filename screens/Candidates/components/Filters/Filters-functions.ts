import { Jobs } from '@/useCases/types';
import { TineInferReturn } from 'tinejs';
import { ALL_JOBS_OPTION } from '../../Candidates-constants';

export const formatOptions = (jobs?: TineInferReturn<Jobs>) => [
  ALL_JOBS_OPTION,
  ...(jobs || [])?.map((job) => ({ label: job.title, value: job.id })),
];
