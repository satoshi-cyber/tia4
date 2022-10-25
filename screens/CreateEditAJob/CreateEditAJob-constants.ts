import { ToastPosition, Theme } from "react-toastify";

export const CLASS_NAMES = {
  form: "w-full"
}

export const TOAST_MESSAGE = {
  ADD_JOB: {
    success: "Job is added",
    error: "Error adding the job"
  },
  EDIT_JOB: {
    success: "Job is edited",
    error: "Error editing the job"
  },
}

export const TOAST_OPTIONS = {
  position: "top-right" as ToastPosition,
  theme: "colored" as Theme
}

export const DEFAULT_QUESTION_TIME = 2000

export const TITLE = "Create a job!"

export const TITLE_FIELD_PROPS = {
  name: "title",
  label: "Job title:",
  type: "text",
  placeholder: "Senior software developer",
};

export const TITLE_ICON = 'HiOutlineBriefcase'

export const DEADLINE_FIELD_PROPS = {
  label: "Deadline:",
  type: "date",
  name: "deadline",
  placeholder: "Senior software developer"
};

export const SUBMIT_BUTTON_PROPS = {
  title: 'Submit'
}
