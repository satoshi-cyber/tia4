export const CLASS_NAMES = {
  form: "w-full"
}

export const TOAST_MESSAGE = {
  success: "Your Profile is updated",
  error: "Error updating your profile"
}

export const TOAST_OPTIONS = {
  position: "top-right",
} as const

export const FIRST_NAME_FIELD_PROPS = {
  name: "firstName",
  label: "First name:",
  type: "text",
  placeholder: "Your name",
};

export const LAST_NAME_FIELD_PROPS = {
  name: "lastName",
  label: "Last name:",
  type: "text",
  placeholder: "Your lastname",
};

export const SUBMIT_BUTTON_PROPS = {
  title: 'Update',
  className: 'mt-4'
}
