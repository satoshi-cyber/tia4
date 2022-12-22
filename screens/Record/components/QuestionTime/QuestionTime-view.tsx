import { CLASS_NAMES } from './QuestionTime-constants';
import { useQuestionTime } from './QuestionTime-hook';
import { QuestionTimeProps } from './QuestionTime-types';

const RecDot: React.FC<QuestionTimeProps> = ({
  recordDate,
  time,
  onStopRecording,
}) => {
  const { timeString } = useQuestionTime({
    recordDate,
    time,
    onStopRecording,
  });

  return (
    <div className={CLASS_NAMES.container}>
      <span className={CLASS_NAMES.wrapper}>
        <span className={CLASS_NAMES.animation}></span>
        <span className={CLASS_NAMES.dot}></span>
      </span>
      <span className={CLASS_NAMES.time}>{timeString}</span>
    </div>
  );
};

export default RecDot;
