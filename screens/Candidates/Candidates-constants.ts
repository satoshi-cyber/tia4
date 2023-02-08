import { formatData } from "./Candidates-functions"

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

export const SKELETON_INTERVIEWS: ReturnType<typeof formatData> = [{
  id: '1',
  thumbnail: '',
  candidateName: 'Lorem ipsum',
  date: undefined,
  score: undefined,
  avatar: undefined
},
{
  id: '2',
  thumbnail: '',
  candidateName: 'Lorem ipsum',
  date: undefined,
  score: undefined,
  avatar: undefined
},
{
  id: '3',
  thumbnail: '',
  candidateName: 'Lorem ipsum',
  date: undefined,
  score: undefined,
  avatar: undefined
}]