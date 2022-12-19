export const VIDEO_PROPS = {
  className:
    'absolute w-screen h-screen top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover scale-x-flip',
  playsInline: true,
  controls: false,
  autoPlay: true,
  muted: true,
}

export const BUTTON_PROPS = {
  className:
    'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 flex items-center justify-center',
}

export const ICON_PROPS = {
  name: 'HiVolumeUp',
  size: 100,
  className: 'text-gray-100',
} as const
