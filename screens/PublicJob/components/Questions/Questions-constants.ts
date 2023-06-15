export const CLASS_NAMES = {
  container: 'mt-12 w-full',
  header: 'text-base mb-4 text-gray-800 font-bold',
  list: 'border border-gray-300 rounded-lg w-full',
  item: 'mb-4 p-4 pt-0 last:mb-0 text-gray-600 border-b border-b-gray-300 last:border-0 first:pt-4 flex flex-row gap-8 w-full justify-between',
  question: 'text-sm md:text-base',
  time: 'text-purple-600',
};

export const PROPS = {
  header: {
    as: 'h2',
    className: CLASS_NAMES.header,
    text: 'You will be requested to provide responses to the following questions.',
  },
  question: {
    className: CLASS_NAMES.question,
    skeletonProps: {
      width: 110,
    },
  },
  time: {
    className: CLASS_NAMES.time,
    skeletonProps: {
      width: 60,
    },
  },
};
