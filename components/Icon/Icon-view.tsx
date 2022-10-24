import React from 'react'
import * as Icons from 'react-icons/hi'
import Skeleton from 'react-loading-skeleton'

import { IconProps } from './Icon-types'

const Icon: React.FC<IconProps> = ({ name, size, isLoading, ...props }) => {
  const IconComponent = Icons[name]

  return isLoading ? (
    <Skeleton width={size} height={size} />
  ) : (
    <IconComponent size={size} {...props} />
  )
}

export default Icon
