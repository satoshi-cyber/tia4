import { useTeamMemberFields } from './TeamMemberFields-hook';
import {
  CLASS_NAMES,
  CLOSE_BUTTON_PROPS,
  EMAIL_FIELD_PROPS,
  ADD_QUESTION_BUTTON_PROPS,
  ROLE_FIELD_PROPS,
} from './TeamMemberFields-constants';
import { TeamMemberFieldsProps } from './TeamMemberFields-types';
import Icon from '../Icon';
import { Field } from '../Form';
import SecondaryButton from '../SecondaryButton';

const TeamMemberFields: React.FC<TeamMemberFieldsProps> = ({ autoFocus }) => {
  const { fields, handleAppend, remove } = useTeamMemberFields();

  return (
    <>
      {fields.map((field, index) => (
        <div key={field.id} className={CLASS_NAMES.container}>
          {fields.length > 1 && (
            <Icon {...CLOSE_BUTTON_PROPS} onClick={() => remove(index)} />
          )}
          <div className={CLASS_NAMES.email}>
            <Field.Input
              autoFocus={autoFocus && index === 0}
              name={`teamMembers.${index}.recipientEmail`}
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
    </>
  );
};

export default TeamMemberFields;
