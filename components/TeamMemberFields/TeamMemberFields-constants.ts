export const CLASS_NAMES = {
  container: "border border-gray-200 w-full p-4 rounded-lg mb-4 flex flex-col md:flex-row relative pt-6",
  email: "w-full md:mr-4"
}

export const CLOSE_BUTTON_PROPS = {
  name: "HiXCircle",
  size: 24,
  className: "absolute right-2 top-2 text-gray-600 cursor-pointer transition-all hover:text-purple-800"
} as const

export const EMAIL_FIELD_PROPS = {
  label: "Email",
  type: "text",
  placeholder: "john.smith@example.com",
}

export const ROLE_FIELD_PROPS = {
  label: "Role",
  options: [
    { label: "Member", value: 'member' },
    { label: "Admin member", value: 'adminMember' },
  ]
}

export const ADD_QUESTION_BUTTON_PROPS = {
  title: "Add another one",
  skeletonProps: {
    width: 100
  }
}
