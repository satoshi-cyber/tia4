import { InterviewPreview } from '@/types';

export const formatData = (interview?: InterviewPreview) => ({
  id: interview?.id,
  thumbnail: interview?.thumbnail,
  candidateName: `${interview?.interviewee?.firstName} ${interview?.interviewee?.lastName}`,
  date: interview?.createdAt,
  score: interview?.score,
  avatar: interview?.interviewee?.avatarUrl,
  votesLeft: interview?.votesLeft,
});
