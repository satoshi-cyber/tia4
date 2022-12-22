export const CLASS_NAMES = {
  buttonContainer:
    'bg-gray-100 p-2 rounded-full fixed z-20 bottom-6 left-1/2 -translate-x-1/2 flex items-center drop-shadow-md',
  handleNextButton: 'ml-[10px] m-[5px]',
  countDown: 'text-[100px] text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-question'
}

export const RECORDING_STATUS = 'recording'

export const RECORD_BUTTON_PROPS = {
  className: 'bg-red-600 w-[50px] h-[50px] rounded-full',
}

export const STOP_RECORDING_BUTTON_PROPS = {
  className: 'bg-red-600 w-[40px] h-[40px] rounded-md shadow-full m-[5px]',
}

export const CLEAR_RECORDING_ICON_PROPS = {
  name: 'HiTrash',
  size: 40,
  className: 'm-[5px]',
} as const

export const HANDLE_NEXT_ICON_PROPS = {
  name: 'HiCheck',
  size: 40,
} as const
