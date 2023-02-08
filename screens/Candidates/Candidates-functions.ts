import { InterviewsQuery } from "@/graphql";

export const formatData = (interviews: InterviewsQuery['interviews']) => interviews.map(interview => ({
  id: interview.id,
  thumbnail: interview.thumbnail,
  candidateName: `${interview.interviewee?.firstName} ${interview.interviewee?.lastName}`,
  date: interview.createdAt,
  score: interview.score,
  avatar: interview.interviewee?.avatarUrl
}))
