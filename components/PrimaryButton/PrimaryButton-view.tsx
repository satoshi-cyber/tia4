import clsx from 'clsx'
import React from 'react'

import { PrimaryButtonProps } from './PrimaryButton-types'

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  className,
  ...restProps
}) => (
  <button
    type="button"
    {...restProps}
    className={clsx(
      'bg-gray-800 bg-gradient-to-r from-purple-500 w-full text-sm  text-gray-100 active:bg-indigo-800 focus:outline-none rounded-full focus-within:ring-2 focus:ring-opacity-50 ring-purple-200 shadow-sm transition-all ease-in-out disabled:opacity-80',
      className
    )}
  >
    {title}
  </button>
)

export default PrimaryButton
