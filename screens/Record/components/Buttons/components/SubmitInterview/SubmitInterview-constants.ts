export const CLASS_NAMES = {
  logo: "absolute m-4 md:m-6",
  description: "absolute w-[80vw] lg:w-[400px] z-10 text-xl md:text-3xl text-gray-100 text-center pointer-events-none transform-gpu top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  uploadButton: 'flex items-center justify-center h-[70px] w-[70px] bg-gray-800 bg-gradient-to-r from-purple-500 w-full text-sm  text-gray-100 active:bg-indigo-800 focus:outline-none rounded-full focus-within:ring-2 focus:ring-opacity-0 ring-purple-200 shadow-sm transition-all ease-in-out disabled:opacity-80',
  buttonContainer:
    'p-2 rounded-full fixed z-20 bottom-6 left-1/2 -translate-x-1/2 flex items-center backdrop-blur-2xl bg-black/10',
  icon: 'pointer-events-none',
  progressContainer: "h-[70px] w-[70px] flex items-center justify-center h-[70px] w-[70px] bg-gray-800 bg-gradient-to-r from-purple-500 w-full text-sm  text-gray-100 focus:outline-none rounded-full ring-purple-200 shadow-sm transition-all ease-in-out"
}

export const DESCRIPTION = 'Click the button to upload the interview! Good luck!'

export const TOAST_OPTIONS = {
  position: "top-right",
} as const

export const TOAST_ERROR = 'Error submitting the interview!'
