import { SkeletonStyleProps } from "react-loading-skeleton";

export interface TitleProps {
  title?: string;
  isLoading?: boolean
  skeletonProps?: SkeletonStyleProps
  className?: string
}
