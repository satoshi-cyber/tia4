import { SkeletonStyleProps } from "react-loading-skeleton";

export interface TitleProps {
  title?: string;
  subTitle: string;
  isLoading?: boolean
  skeletonProps?: SkeletonStyleProps
}
