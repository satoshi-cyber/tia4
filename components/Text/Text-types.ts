import React from "react";
import { SkeletonStyleProps } from "react-loading-skeleton";

export interface TextProps {
  text?: React.ReactNode;
  isLoading?: boolean
  skeletonProps?: SkeletonStyleProps
  className?: string
  htmlFor?: string
  as?: React.ComponentType<TextProps> | string
}
