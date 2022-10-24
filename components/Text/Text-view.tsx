import React from 'react'
import Skeleton from 'react-loading-skeleton'

import { TextProps } from './Text-types'

const Text: React.FC<TextProps> = ({
  as: Component = 'p',
  text,
  isLoading,
  skeletonProps,
  ...restProps
}) => (
  <Component {...restProps}>
    {isLoading ? <Skeleton {...skeletonProps} /> : text}
  </Component>
)

export default Text
