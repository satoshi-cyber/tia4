import { SkeletonProps } from 'react-loading-skeleton'

import { CLASS_NAMES } from './SecondaryButton-constants'

export interface SecondaryButtonProps
  extends React.HTMLProps<HTMLButtonElement> {
  title: string
  variant?: keyof typeof CLASS_NAMES
  className?: string
  skeletonProps?: SkeletonProps
  isLoading?: boolean
}
