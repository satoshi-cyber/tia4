import { CLASS_NAMES, PROPS } from './Questions-constants';
import { formatTime } from './Questions-functions';
import { QuestionsProps } from './Questions-types';

const Questions: React.FC<QuestionsProps> = ({ questions }) => {
  return (
    <div className={CLASS_NAMES.container}>
      <h2 className={CLASS_NAMES.header}>{PROPS.header}</h2>
      <ul className={CLASS_NAMES.list}>
        {questions?.map((question) => (
          <li className={CLASS_NAMES.item}>
            <span className={CLASS_NAMES.question}>{question.question}</span>
            <span className={CLASS_NAMES.time}>
              {formatTime(question.time)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Questions;
