import React from "react";
import { SkeletonStyleProps } from "react-loading-skeleton";

export interface TitleProps {
  title?: string;
  subTitle?: string;
  isLoading?: boolean
  skeletonProps?: SkeletonStyleProps
  subTitleSkeletonProps?: SkeletonStyleProps
  className?: string
  after?: React.ReactNode
  before?: React.ReactNode
}
