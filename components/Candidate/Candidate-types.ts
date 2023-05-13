import { InterviewPreviewFragment } from '@/graphql';
import { Interviews } from '@/useCases/types';
import { TineInferReturn } from 'tinejs';

export interface CandidateProps {
  interview?: TineInferReturn<Interviews>[0] | InterviewPreviewFragment;
}
