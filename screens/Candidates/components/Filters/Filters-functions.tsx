import { Job } from '@/graphql';

import { ALL_JOBS_OPTION } from '../../Candidates-constants';

export const formatOptions = (jobs?: Pick<Job, 'id' | 'title'>[]) => [
  ALL_JOBS_OPTION,
  ...(jobs || [])?.map((job) => ({ label: job.title, value: job.id })),
];
