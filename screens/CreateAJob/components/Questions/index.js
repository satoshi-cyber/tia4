import { useFieldArray } from "react-hook-form";
import {
  Icon,
  InputField,
  SecondaryButton,
  SelectField,
} from "../../../../components";

export const Questions = () => {
  const { fields, append, remove } = useFieldArray({
    name: "questions",
  });

  return (
    <div>
      <p className="text-sm text-gray-900 text-left w-full mb-2">Questions:</p>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="border border-gray-300 w-full p-4 rounded-lg mb-4 flex flex-row relative pt-6 shadow-sm"
        >
          {fields.length > 1 && (
            <Icon
              name="HiXCircle"
              size={24}
              className="absolute right-2 top-2 text-gray-600"
              onClick={() => remove(index)}
            />
          )}
          <div className="w-full mr-4">
            <InputField
              label="question:"
              type="text"
              name={`questions.${index}.question`}
              placeholder="Senior software developer"
            />
          </div>
          <div>
            <SelectField
              label="time:"
              type="text"
              name={`questions.${index}.time`}
              placeholder="Senior software developer"
            >
              <option value={10000}>10 min</option>
              <option value={5000}>5 min</option>
              <option value={2000}>2 min</option>
              <option value={1000}>1 min</option>
            </SelectField>
          </div>
        </div>
      ))}
      <SecondaryButton title="Add a questions" onClick={() => append({})} />
    </div>
  );
};
