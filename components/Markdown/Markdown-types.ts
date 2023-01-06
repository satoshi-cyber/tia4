import { SkeletonProps } from "react-loading-skeleton";

export interface TextProps {
  text?: string | null;
  isLoading?: boolean
  skeletonProps?: SkeletonProps
  className?: string
  htmlFor?: string
}
