import React from "react";
import { SkeletonStyleProps } from "react-loading-skeleton";

export interface SkeletonLoaderProps extends SkeletonStyleProps {
  isLoading?: boolean
  after?: React.ReactNode
}
