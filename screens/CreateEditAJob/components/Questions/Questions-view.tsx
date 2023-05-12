import { useQuestions } from './Questions-hook';
import {
  CLASS_NAMES,
  TITLE_PROPS,
  CLOSE_BUTTON_PROPS,
  QUESTION_FIELD_PROPS,
  TIME_FIELD_PROPS,
  ADD_QUESTION_BUTTON_PROPS,
} from './Questions-constants';
import Icon from '@/components/Icon';
import Text from '@/components/Text';
import { Field } from '@/components/Form';
import SecondaryButton from '@/components/SecondaryButton';

const Questions: React.FC = () => {
  const { fields, handleAppend, remove } = useQuestions();

  return (
    <div>
      <Text className={CLASS_NAMES.title} {...TITLE_PROPS} />
      {fields.map((field, index) => (
        <div key={field.id} className={CLASS_NAMES.container}>
          {fields.length > 1 && (
            <Icon {...CLOSE_BUTTON_PROPS} onClick={() => remove(index)} />
          )}
          <div className={CLASS_NAMES.question}>
            <Field.TextArea
              name={`questions.${index}.question`}
              {...QUESTION_FIELD_PROPS}
            />
          </div>
          <div>
            <Field.Select
              name={`questions.${index}.time`}
              {...TIME_FIELD_PROPS}
            />
          </div>
        </div>
      ))}
      <SecondaryButton
        {...ADD_QUESTION_BUTTON_PROPS}
        onClick={handleAppend}
        className="mb-8"
      />
    </div>
  );
};

export default Questions;
