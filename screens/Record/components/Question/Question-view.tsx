import React from 'react';

import { QuestionTime } from './components';
import { useQuestion } from './Question-hook';
import { QuestionProps } from './Question-types';

const Question: React.FC<QuestionProps> = ({
  question,
  isRecording,
  onStopRecording,
}) => {
  const { classNames } = useQuestion({ isRecording });

  return (
    <div className={classNames.container}>
      <p className={classNames.question}>{question.question}</p>
      {isRecording && (
        <QuestionTime time={question.time} onStopRecording={onStopRecording} />
      )}
    </div>
  );
};

export default Question;
