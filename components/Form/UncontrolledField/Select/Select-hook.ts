import clsx from "clsx"

import { FORM_THEME } from "../../Form-constants"

interface Options {
  className?: string
  variant?: keyof typeof FORM_THEME;
}

export const useSelect = ({ variant = 'default', className }: Options) => {
  const classNames = {
    input: clsx(
      FORM_THEME[variant].padding,
      FORM_THEME[variant].style,
      'pr-10',
      className
    ),
    container: clsx(
      FORM_THEME[variant].container,
      FORM_THEME[variant].containerWidth
    ),
    appendContainer: FORM_THEME[variant].appendContainer,
    appendLeft: FORM_THEME[variant].appendLeft,
    appendRight: FORM_THEME[variant].appendRight,
  }

  return { classNames }
}