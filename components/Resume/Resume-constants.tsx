export const CLASS_NAMES = {
  container: 'w-full mb-4',
  label: 'text-sm text-gray-600 mb-3 text-left',
  fileContainer: 'flex flex-row w-full items-center justify-between mb-5',
  fileLinkLoading: 'pointer-events-none',
  file: 'flex flex-row items-center transition-all hover:text-purple-800',
  fileIcon: 'mr-2',
  fileLabel: 'text-xs',
  root: {
    base: 'w-full flex transition-all justify-center h-[100px] border border-gray-300 shadow-sm rounded-lg items-center justify-center',
    isDragReject: 'border-red-600',
    isDragAccept: 'border-purple-800',
  },
  uploadLabel: {
    default: 'text-sm',
    isDragAccept: 'text-sm',
    isDragReject: 'text-sm text-red-600',
  },
  removeButton: 'text-gray-600 transition-all hover:text-purple-800',
}

export const LABEL_PROPS = {
  text: 'Resume / CV:',
  skeletonProps: { width: 80 },
}

export const FILE_ICON_PROPS = {
  name: 'HiOutlineDocument',
  size: 30,
} as const

export const FILE_LABEL_PROPS = {
  skeletonProps: { width: 200 },
}

export const FILE_LABEL_APPEND = '(View)'

export const UPLOAD_LABEL_PROPS = {
  default: {
    text: "Drag 'n' drop your cv here, or click to select file",
    skeletonProps: { width: 260 },
  },
  isDragAccept: {
    text: 'Drop your cv!',
    skeletonProps: { width: 260 },
  },
  isDragReject: {
    text: 'File format is not supported!',
    skeletonProps: { width: 260 },
  },
}

export const REMOVE_BUTTON_PROPS = {
  name: 'HiXCircle',
  size: 25,
} as const
