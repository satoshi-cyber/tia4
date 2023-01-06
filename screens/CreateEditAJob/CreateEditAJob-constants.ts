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
  DELETE_JOB: {
    success: "Job is deleted",
    error: "Error deleting the job"
  },
}

export const TOAST_OPTIONS = {
  position: "top-right",
} as const

export const DEFAULT_QUESTION_TIME = 120

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

export const DESCRIPTION_FIELD_PROPS = {
  label: "Description:",
  name: "description",
  placeholder: "Senior software developer"
}

export const SUBMIT_BUTTON_PROPS = {
  title: 'Submit'
}

export const DELETE_JOB_BUTTON_PROPS = {
  title: 'Delete job',
  variant: 'delete',
  className: 'mt-8',
  skeletonProps: {
    width: 80
  }
} as const

export const PUSH_DELAY = 300
