import React from 'react'
import * as Icons from 'react-icons/hi'

import { IconProps } from './Icon-types'

import SkeletonLoader from '../SkeletonLoader'

const Icon: React.FC<IconProps> = ({ name, size, isLoading, ...props }) => {
  const IconComponent = Icons[name]

  return (
    <SkeletonLoader
      isLoading={isLoading}
      width={size}
      height={size}
      after={<IconComponent size={size} {...props} />}
    />
  )
}

export default Icon
