export const CLASS_NAMES = {
  title: "text-sm text-gray-900 text-left w-full mb-2",
  container: "border border-gray-300 w-full p-4 rounded-lg mb-4 flex flex-row relative pt-6 shadow-sm",
  question: "w-full mr-4"
}

export const TITLE_PROPS = {
  text: "Questions:",
  skeletonProps: {
    width: 100
  }
}

export const CLOSE_BUTTON_PROPS = {
  name: "HiXCircle",
  size: 24,
  className: "absolute right-2 top-2 text-gray-600 cursor-pointer transition-all hover:text-purple-800"
} as const

export const QUESTION_FIELD_PROPS = {
  label: "Question:",
  type: "text",
  placeholder: "Tell me about yourself"
}

export const TIME_FIELD_PROPS = {
  className: 'min-w-[100px]',
  label: "Time:",
  placeholder: "2 min",
  options: [
    { value: "10000", label: '10 min' },
    { value: "5000", label: '5 min' },
    { value: "2000", label: '2 min' },
    { value: "1000", label: '1 min' },
  ]
}

export const ADD_QUESTION_BUTTON_PROPS = {
  title: "Add a questions",
  skeletonProps: {
    width: 100
  }
}
