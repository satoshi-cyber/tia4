import { InterviewPreviewFragment } from "@/graphql"

export const CLASS_NAMES = {
  form: 'w-full',
  list: "grid sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
}

export const LAYOUT_PROPS = {
  width: "sm:max-w-[600px] lg:max-w-[900px]"
}

export const TITLE_PROPS = {
  title: "Candidates",
  subTitle: "Search, watch interviews, and review candidates!",
  skeletonProps: { width: 280 },
  subTitleSkeletonProps: { width: 200 }
}

export const ALL_JOBS_OPTION = {
  label: 'All jobs',
  value: 'ALL'
}

export const SKELETON_INTERVIEWS: InterviewPreviewFragment[] = [{
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
{
  id: '4',
  thumbnail: '',
  createdAt: new Date(),
},
{
  id: '5',
  thumbnail: '',
  createdAt: new Date(),
}]