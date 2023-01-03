export const CLASS_NAMES = {
  form: "w-full"
}

export const TITLE_PROPS = {
  title: 'Your application',
  subTitle: 'Update your info!'
}

export const TOAST_MESSAGE = {
  success: "Your Profile is updated",
  error: "Error updating your profile"
}

export const TOAST_OPTIONS = {
  position: "top-right",
} as const

export const FIELDS = {
  firstName: {
    name: "firstName",
    label: "First name:",
    type: "text",
    placeholder: "Your name",
  },
  lastName: {
    name: "lastName",
    label: "Last name:",
    type: "text",
    placeholder: "Your lastname",
  },
  linkedInProfile: {
    name: "linkedInProfile",
    label: "LinkedIn profile url:",
    type: "text",
    placeholder: "https://www.linkedin.com/in/yourid",
  },
  bio: {
    name: "bio",
    label: "Bio:",
    placeholder: "Your bio",
  }
}

export const LINKEDIN_PROFILE_ICON = 'HiOutlineLink'

export const SUBMIT_BUTTON_PROPS = {
  title: 'Continue',
  className: 'mt-4',
  allowEmptySubmit: true
}
