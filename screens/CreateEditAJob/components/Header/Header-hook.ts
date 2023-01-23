import { useWatch } from "react-hook-form";

import { TITLE_FIELD_NAME, TITLE, TITLE_PROPS } from "./Header-constants";

interface HeaderOptions {
  editJob?: Boolean
}

export const useHeader = ({ editJob }: HeaderOptions) => {
  const jobTitle = useWatch({ name: TITLE_FIELD_NAME })

  const title = editJob ? TITLE.EDIT_JOB.replace('[jobTitle]', jobTitle) : TITLE.ADD_JOB

  const titleProps = editJob ? TITLE_PROPS.EDIT_JOB : TITLE_PROPS.ADD_JOB

  return {
    title,
    titleProps
  };
};
