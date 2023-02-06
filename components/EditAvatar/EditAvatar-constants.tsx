export const CLASS_NAMES = {
  container: 'w-full flex justify-center',
  root: 'w-[80px] h-[80px] relative group cursor-pointer',
  image: {
    base: 'absolute rounded-full border border-gray-200 group-hover:opacity-0 transition-all w-full h-full',
    editMode: 'hidden',
  },
  upload: {
    base: 'absolute w-full h-full border border-gray-200 block flex items-center justify-center text-center rounded-full transition-all',
    editMode: 'opacity-0 group-hover:opacity-100',
  },
  label: 'text-sm text-gray-600 p-2',
};

export const LABEL = 'Upload picture';

export const SKELETON_PROPS = {
  isLoading: true,
  width: 100,
  height: 100,
  borderRadius: '100%',
};
