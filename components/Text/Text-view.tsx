import React from 'react'

import { TextProps } from './Text-types'

import SkeletonLoader from '../SkeletonLoader'

const Text: React.FC<TextProps> = ({
  as: Component = 'p',
  text,
  isLoading,
  skeletonProps,
  ...restProps
}) => (
  <Component {...restProps}>
    <SkeletonLoader isLoading={isLoading} {...skeletonProps} after={text} />
  </Component>
)

export default Text
