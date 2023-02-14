import { Icon, Field, SecondaryButton, Text } from '@/components';

import { useTeamMemberFields } from './TeamMemberFields-hook';
import {
  CLASS_NAMES,
  TITLE_PROPS,
  CLOSE_BUTTON_PROPS,
  EMAIL_FIELD_PROPS,
  ADD_QUESTION_BUTTON_PROPS,
  ROLE_FIELD_PROPS,
} from './TeamMemberFields-constants';

const TeamMemberFields: React.FC = () => {
  const { fields, handleAppend, remove } = useTeamMemberFields();

  return (
    <div>
      <Text className={CLASS_NAMES.title} {...TITLE_PROPS} />
      {fields.map((field, index) => (
        <div key={field.id} className={CLASS_NAMES.container}>
          {fields.length > 1 && (
            <Icon {...CLOSE_BUTTON_PROPS} onClick={() => remove(index)} />
          )}
          <div className={CLASS_NAMES.question}>
            <Field.Input
              name={`teamMembers.${index}.email`}
              {...EMAIL_FIELD_PROPS}
            />
          </div>
          <div>
            <Field.Select
              name={`teamMembers.${index}.role`}
              {...ROLE_FIELD_PROPS}
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

export default TeamMemberFields;
