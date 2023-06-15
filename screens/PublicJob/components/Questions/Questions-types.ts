import { PublicJob } from '@/useCases/types';
import { TineInferReturn } from 'tinejs';

export interface QuestionsProps {
  questions?: NonNullable<TineInferReturn<PublicJob>>['questions'];
}
