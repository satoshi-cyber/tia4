import { Answer } from '@/graphql'

export interface InterviewPlayerProps {
  answers: Pick<Answer, 'url' | 'question'>[] | undefined | null
  className?: string
}

export type PlayerWithWidth = Player as any;
