import { Question } from "@/graphql"

export interface QuestionProps {
  onStopRecording: () => void
  question: Question
  isRecording: boolean
  recordDate?: Date
}
