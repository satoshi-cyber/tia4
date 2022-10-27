export const CLASS_NAMES = {
  container: "flex w-full flex-row justify-between items-center border p-4 rounded-lg shadow-sm",
  title: "text-2xl mb-2 text-gray-600",
  deadline: "text-xs text-gray-600",
  options: 'grid grid-cols-2 gap-4 ml-4',
  button: 'text-gray-600 hover:text-black active:text-purple-900 transition-all ease-in-out'
};

export const TOAST_MESSAGE = {
  success: "Link copied to clipboard!",
  error: "Error copying link to the clipboard!"
}

export const TOAST_OPTIONS = {
  position: "top-right",
  theme: "colored"
} as const

export const EDIT_BUTTON_PROPS = {
  name: "HiPencil",
  size: 30,
  className: CLASS_NAMES.button
} as const

export const LINK_BUTTON_PROPS = {
  name: "HiExternalLink",
  size: 30,
  className: CLASS_NAMES.button
} as const