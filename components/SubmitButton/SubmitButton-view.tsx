import clsx from 'clsx'
import React from 'react'

import { CLASS_NAMES } from './SubmitButton-constants'
import { useSubmitButton } from './SubmitButton-hook'
import { SubmitButtonProps } from './SubmitButton-types'

const SubmitButton: React.FC<SubmitButtonProps> = ({
  title,
  className,
  ...restProps
}) => {
  const { disabled } = useSubmitButton()

  return (
    <button
      {...restProps}
      type="submit"
      disabled={disabled}
      className={clsx(CLASS_NAMES.button, className)}
    >
      {title}
    </button>
  )
}

export default SubmitButton
