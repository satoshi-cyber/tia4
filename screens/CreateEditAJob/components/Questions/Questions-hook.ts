import { useFieldArray } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { DEFAULT_QUESTION_TIME } from "../../CreateEditAJob-constants";

export const useQuestions = () => {
  const { fields, append, remove } = useFieldArray({
    name: "questions",
  });

  const handleAppend = () =>
    append({ id: uuidv4(), time: DEFAULT_QUESTION_TIME });

  return {
    fields,
    remove,
    handleAppend
  }
}
