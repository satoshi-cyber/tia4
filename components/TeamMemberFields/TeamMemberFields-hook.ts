import { useFieldArray } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

export const useTeamMemberFields = () => {
  const { fields, append, remove } = useFieldArray({
    name: "teamMembers",
  });

  const handleAppend = () =>
    append({ id: uuidv4(), label: "member" });

  return {
    fields,
    remove,
    handleAppend
  }
}
