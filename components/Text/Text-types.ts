import React from "react";
import { SkeletonStyleProps } from "react-loading-skeleton";

export interface TextProps {
  text?: string;
  isLoading?: boolean
  skeletonProps?: SkeletonStyleProps
  className?: String
  as?: React.ComponentType<TextProps>
}
