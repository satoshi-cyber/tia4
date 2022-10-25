import { Icon, Field, SecondaryButton } from '@/components'

import { useQuestions } from './Questions-hook'
import {
  TITLE,
  CLASS_NAMES,
  CLOSE_BUTTON_PROPS,
  QUESTION_FIELD_PROPS,
  TIME_FIELD_PROPS,
  ADD_A_QUESTION_TITLE,
} from './Questions-constants'

export const Questions: React.FC = () => {
  const { fields, handleAppend, remove } = useQuestions()

  return (
    <div>
      <p className={CLASS_NAMES.title}>{TITLE}</p>
      {fields.map((field, index) => (
        <div key={field.id} className={CLASS_NAMES.container}>
          {fields.length > 1 && (
            <Icon {...CLOSE_BUTTON_PROPS} onClick={() => remove(index)} />
          )}
          <div className={CLASS_NAMES.question}>
            <Field.Input
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
      <SecondaryButton title={ADD_A_QUESTION_TITLE} onClick={handleAppend} />
    </div>
  )
}
