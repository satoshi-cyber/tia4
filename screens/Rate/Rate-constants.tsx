import { InterviewPreview } from '@/types';

export const CLASS_NAMES = {
  list: 'grid sm:grid-cols-2 gap-8 w-full',
};

export const TITLE_PROPS = {
  title: 'Rate candidates',
  subTitle:
    'Evaluate the interview performance and make informed hiring decisions.',
  skeletonProps: { width: 120 },
  subTitleSkeletonProps: { width: 280 },
};

export const LAYOUT_PROPS = {
  width: 'max-w-[600px]',
};

export const SKELETON_INTERVIEWS: InterviewPreview[] = [
  {
    id: '1',
    thumbnail: '',
    createdAt: new Date(),
  },
  {
    id: '2',
    thumbnail: '',
    createdAt: new Date(),
  },
  {
    id: '3',
    thumbnail: '',
    createdAt: new Date(),
  },
];
