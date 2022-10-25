import React from 'react'
import * as Icons from 'react-icons/hi'
import Skeleton from 'react-loading-skeleton'

import { IconProps } from './ButtonIcon-types'

const ButtonIcon: React.FC<IconProps> = ({
  name,
  size,
  className,
  isLoading,
  ...props
}) => {
  const IconComponent = Icons[name]

  return isLoading ? (
    <Skeleton width={size} height={size} />
  ) : (
    <button {...props}>
      <IconComponent size={size} className={className} />
    </button>
  )
}

export default ButtonIcon
