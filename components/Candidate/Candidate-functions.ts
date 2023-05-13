import { InterviewsQuery } from '@/graphql';
import { Interviews } from '@/useCases/types';
import { TineInferReturn } from 'tinejs';

export const formatData = (
  interview?: TineInferReturn<Interviews>[0] | InterviewsQuery['interviews'][0]
) => ({
  id: interview?.id,
  thumbnail: interview?.thumbnail,
  candidateName: `${interview?.interviewee?.firstName} ${interview?.interviewee?.lastName}`,
  date: interview?.createdAt,
  score: interview?.score,
  avatar: interview?.interviewee?.avatarUrl,
  votesLeft: interview?.votesLeft,
});
