import React from 'react'

import { TitleProps } from './Title-types'

import Text from '../Text'

const Title: React.FC<TitleProps> = ({
  title,
  subTitle,
  skeletonProps,
  subTitleskeletonProps,
  isLoading,
}) => (
  <div className="flex flex-col items-center mb-10">
    <Text
      as="h1"
      isLoading={isLoading}
      className="text-3xl text-normal text-gray-900 text-center"
      text={title}
      skeletonProps={skeletonProps}
    />
    {subTitle && (
      <Text
        isLoading={isLoading}
        className="text-lg text-gray-500 mt-2 whitespace-pre-line text-center"
        text={subTitle}
        skeletonProps={subTitleskeletonProps}
      />
    )}
  </div>
)

export default Title
