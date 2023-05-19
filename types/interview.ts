export type InterviewPreview = {
  id: string;
  thumbnail: string;
  createdAt: Date;
  interviewee?: {
    firstName?: string | null;
    lastName?: string | null;
    avatarUrl?: string;
  };
  score?: number | null;
  votesLeft?: number | null;
};
