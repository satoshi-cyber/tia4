import { useFieldArray } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { Icon, Field, SecondaryButton } from "../../../../components";

export const Questions: React.FC = () => {
  const { fields, append, remove } = useFieldArray({
    name: "questions",
  });

  const handleAppend = () => append({ id: uuidv4() });

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
            <Field.Input
              label="Question:"
              type="text"
              name={`questions.${index}.question`}
              placeholder="Tell me about yourself"
            />
          </div>
          <div>
            <Field.Select
              label="Time:"
              name={`questions.${index}.time`}
              placeholder="2 min"
            >
              <option value="10000">10 min</option>
              <option value="5000">5 min</option>
              <option value="2000">2 min</option>
              <option value="1000">1 min</option>
            </Field.Select>
          </div>
        </div>
      ))}
      <SecondaryButton title="Add a questions" onClick={handleAppend} />
    </div>
  );
};
