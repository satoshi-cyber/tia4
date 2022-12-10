export const CLASS_NAMES = {
  form: "w-full"
}

export const TITLE_PROPS = {
  title: "Setup company",
  subTitle: "Create a new company!",
}

export const TOAST_MESSAGE = {
  success: "Company is created!",
  error: "Error creating your company, it already exists!"
}

export const TOAST_OPTIONS = {
  position: "top-right",
} as const

export const COMPANY_NAME_FIELD_PROPS = {
  name: "name",
  label: "Company name:",
  type: "text",
  placeholder: "Your Company LLC",
};

export const COMPANY_WEBSITE_FIELD_PROPS = {
  name: "website",
  label: "Company website:",
  type: "text",
  placeholder: "http://your-company-website.com",
};

export const SUBMIT_BUTTON_PROPS = {
  title: 'Create company',
  className: 'mt-4'
}

export const INFO_PROPS = {
  className: 'text-sm text-gray-500 mt-4 whitespace-pre-line text-center',
  text: 'Ask an company admin to send you an invite if company exits!'
}

export const PUSH_DELAY = 300
