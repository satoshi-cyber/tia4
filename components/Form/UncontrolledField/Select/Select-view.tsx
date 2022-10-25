import clsx from 'clsx'
import React from 'react'

import { SelectProps } from './Select-types'

import { FORM_THEME } from '../../Form-constants'

export const Select: React.FC<SelectProps> = React.forwardRef(
  (
    {
      variant = 'default',
      before,
      className,
      after,
      name,
      options,
      ...restProps
    },
    ref
  ) => {
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

    return (
      <div className={classNames.container}>
        {before && (
          <label htmlFor={name} className={classNames.appendContainer}>
            {React.cloneElement(before, {
              className: classNames.appendLeft,
            })}
          </label>
        )}
        <select
          {...restProps}
          name={name}
          className={classNames.input}
          ref={ref as any}
        >
          {options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        {after && (
          <label htmlFor={name} className={classNames.appendContainer}>
            {React.cloneElement(after, {
              className: classNames.appendRight,
            })}
          </label>
        )}
      </div>
    )
  }
)

Select.displayName = 'Select'
