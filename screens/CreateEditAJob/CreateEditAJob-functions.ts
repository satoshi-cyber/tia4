import { Job } from '@/useCases/types';
import { TineInferReturn } from 'tinejs';

export const parseDefaults = (data: TineInferReturn<Job>) => ({
  id: data.id ?? undefined,
  title: data.title ?? undefined,
  deadline: data.deadline ?? undefined,
  description: data.description ?? undefined,
  questions: data.questions ?? [],
});
