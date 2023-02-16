import { useFieldArray } from "react-hook-form";

export const useTeamMemberFields = () => {
  const { fields, append, remove } = useFieldArray({
    name: "teamMembers",
  });

  const handleAppend = () =>
    append({});

  return {
    fields,
    remove,
    handleAppend
  }
}
