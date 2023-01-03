import clsx from 'clsx';
import { CLASS_NAMES } from './Question-constants';

interface QuestionProps {
  isRecording: boolean;
}

export const useQuestion = ({ isRecording }: QuestionProps) => {
  const classNames = {
    ...CLASS_NAMES,
    question: clsx(
      CLASS_NAMES.question.base,
      isRecording && CLASS_NAMES.question.isRecording
    ),
  };

  return { classNames };
};
