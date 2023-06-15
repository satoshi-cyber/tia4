import Text from '@/components/Text';

import { CLASS_NAMES, PROPS } from './Questions-constants';
import { formatTime } from './Questions-functions';
import { QuestionsProps } from './Questions-types';

const Questions: React.FC<QuestionsProps> = ({ questions }) => {
  return (
    <div className={CLASS_NAMES.container}>
      <Text {...PROPS.header} />
      <ul className={CLASS_NAMES.list}>
        {questions?.map((question) => (
          <li className={CLASS_NAMES.item} id={question.id}>
            <Text {...PROPS.question} text={question.question} />
            <Text {...PROPS.time} text={formatTime(question.time)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Questions;
