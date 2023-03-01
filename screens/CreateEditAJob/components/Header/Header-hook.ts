import { useWatch } from "react-hook-form";

import { TITLE_FIELD_NAME, TITLE, TITLE_PROPS } from "./Header-constants";

interface HeaderOptions {
  editJob?: Boolean
  handleDeleteJob: () => void
}

export const useHeader = ({ editJob, handleDeleteJob }: HeaderOptions) => {
  const jobTitle = useWatch({ name: TITLE_FIELD_NAME })

  const title = editJob ? TITLE.EDIT_JOB.replace('[jobTitle]', jobTitle) : TITLE.ADD_JOB

  const titleProps = editJob ? TITLE_PROPS.EDIT_JOB : TITLE_PROPS.ADD_JOB

  const items = [{
    label: 'Delete Job',
    activeColor: 'text-red-800',
    onClick: handleDeleteJob
  }]

  return {
    title,
    titleProps,
    items
  };
};
