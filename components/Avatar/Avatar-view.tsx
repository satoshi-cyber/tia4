import React from 'react'
import ReactAvatar from 'react-avatar'

import { AvatarProps } from './Avatar-types'

import SkeletonLoader from '../SkeletonLoader'

const Avatar: React.FC<AvatarProps> = ({ isLoading, size, ...restProps }) => (
  <SkeletonLoader
    isLoading={isLoading}
    width={size && parseInt(size, 10)}
    height={size && parseInt(size, 10)}
    borderRadius={'100%'}
    after={<ReactAvatar round {...restProps} size={size} />}
  />
)

export default Avatar
