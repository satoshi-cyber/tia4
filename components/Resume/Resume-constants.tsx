export const CLASS_NAMES = {
  container: 'w-full flex justify-center',
  root: 'w-full h-[100px] relative group cursor-pointer',
  image: {
    base: 'absolute rounded-lg border border-gray-200 shadow-sm group-hover:opacity-0 transition-all w-full h-full',
    editMode: 'hidden',
  },
  upload: {
    base: 'absolute w-full h-full border border-gray-200 shadow-sm block flex items-center justify-center text-center rounded-lg transition-all',
    editMode: 'opacity-0 group-hover:opacity-100',
  },
  label: 'text-sm text-gray-600 p-2',
}

export const LABEL = 'Upload picture'

export const SKELETON_PROPS = {
  isLoading: true,
  width: 200,
  height: 100,
  borderRadius: 6,
}
