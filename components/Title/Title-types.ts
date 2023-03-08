import React from "react";
import { SkeletonStyleProps } from "react-loading-skeleton";

export interface TitleProps {
  title?: React.ReactNode;
  subTitle?: React.ReactNode;
  isLoading?: boolean
  skeletonProps?: SkeletonStyleProps
  subTitleSkeletonProps?: SkeletonStyleProps
  className?: string
  after?: React.ReactNode
  before?: React.ReactNode
}
