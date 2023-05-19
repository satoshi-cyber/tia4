export interface InterviewPlayerProps {
  answers: Pick<PrismaJson.Answer, 'url' | 'question'>[] | undefined | null;
  className?: string;
}
