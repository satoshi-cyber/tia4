import { InterviewsQuery } from "@/graphql";

export const formatData = (interview?: InterviewsQuery['interviews'][0]) => ({
    id: interview?.id,
    thumbnail: interview?.thumbnail,
    candidateName: `${interview?.interviewee?.firstName} ${interview?.interviewee?.lastName}`,
    date: interview?.createdAt,
    score: interview?.score,
    avatar: interview?.interviewee?.avatarUrl,
    votesLeft: interview?.votesLeft
})