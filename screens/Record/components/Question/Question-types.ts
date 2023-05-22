export interface QuestionProps {
  onStopRecording: () => void;
  question: PrismaJson.Question;
  isRecording: boolean;
  recordDate?: Date;
}
