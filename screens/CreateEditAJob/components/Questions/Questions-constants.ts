export const CLASS_NAMES = {
  title: "text-xl text-gray-900 text-center w-full my-8 mb-6",
  container: "border border-gray-200 w-full p-4 rounded-lg mb-4 flex flex-col relative pt-6",
  question: "w-full mr-4"
}

export const TITLE_PROPS = {
  text: "Questions",
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
  label: "Question",
  type: "text",
  placeholder: "Tell me about yourself",
  minRows: 1
}

export const TIME_FIELD_PROPS = {
  className: 'min-w-[100px]',
  label: "Time",
  placeholder: "2 min",
  options: [
    { value: "300", label: '5 min' },
    { value: "180", label: '3 min' },
    { value: "120", label: '2 min' },
    { value: "60", label: '1 min' },
    { value: "30", label: '30 sec' },
  ]
}

export const ADD_QUESTION_BUTTON_PROPS = {
  title: "Add a questions",
  skeletonProps: {
    width: 100
  }
}
