export const CLASS_NAMES = {
  container: "flex w-full flex-row justify-between items-center border p-4 rounded-lg",
  title: "text-xl md:text-2xl mb-1 text-gray-800",
  deadline: "text-xs text-gray-600",
  options: 'grid grid-cols-2 gap-2 ml-3 flex-none',
};

export const TOAST_MESSAGE = {
  success: "Link copied to clipboard!",
  error: "Error copying link to the clipboard!"
}

export const TOAST_OPTIONS = {
  position: "top-right",
} as const

export const EDIT_BUTTON_PROPS = {
  name: "HiPencil",
} as const

export const LINK_BUTTON_PROPS = {
  name: "HiExternalLink",
} as const