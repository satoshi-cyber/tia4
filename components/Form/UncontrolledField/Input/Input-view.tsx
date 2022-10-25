import clsx from 'clsx'
import React from 'react'
import { Text } from '@/components'

import { InputProps } from './Input-types'

import { FORM_THEME } from '../../Form-constants'
import SkeletonLoader from '@/components/SkeletonLoader'

export const Input: React.FC<InputProps> = React.forwardRef(
  (
    { variant = 'default', before, className, after, name, ...restProps },
    ref
  ) => {
    const classNames = {
      input: clsx(
        FORM_THEME[variant].padding,
        FORM_THEME[variant].style,
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

    return (
      <div className={classNames.container}>
        {before && (
          <Text
            as="label"
            htmlFor={name}
            className={classNames.appendContainer}
            text={React.cloneElement(before, {
              className: classNames.appendLeft,
            })}
          />
        )}
        <SkeletonLoader
          wrapper={({ children }: { children?: React.ReactElement }) => (
            <div {...restProps} className={classNames.input}>
              {children}
            </div>
          )}
          after={
            <input
              name={name}
              {...restProps}
              ref={ref as any}
              className={classNames.input}
            />
          }
        />
        {after && (
          <Text
            as="label"
            htmlFor={name}
            className={classNames.appendContainer}
            text={React.cloneElement(after, {
              className: classNames.appendRight,
            })}
          />
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
