import clsx from 'clsx';
import React from 'react';

import { QuestionProps } from './Question-types';

const Question: React.FC<QuestionProps> = ({ question, isRecording }) => {
  return (
    <div className="relative">
      <p
        className={clsx(
          'text-2xl text-white text-center pointer-events-none transition-all transform-gpu duration-700',
          isRecording && 'scale-75'
        )}
      >
        {question}
      </p>
    </div>
  );
};

export default Question;
