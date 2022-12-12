import React from "react";
import { SkeletonProps } from "react-loading-skeleton";
export interface SkeletonLoaderProps extends Omit<SkeletonProps, 'wrapper'> {
  isLoading?: boolean
  after?: React.ReactNode
  className?: string
  wrapper?: React.ComponentType
}
