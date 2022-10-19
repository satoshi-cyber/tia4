import clsx from "clsx";
import React from "react";

import { InputProps } from "./Input-types";

import { FORM_THEME } from "../../Form-constants";

export const Input: React.FC<InputProps> = React.forwardRef(
  (
    { variant = "default", before, className, after, name, ...restProps },
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
    };

    return (
      <div className={classNames.container}>
        {before && (
          <label htmlFor={name} className={classNames.appendContainer}>
            {React.cloneElement(before, {
              className: classNames.appendLeft,
            })}
          </label>
        )}
        <input
          name={name}
          {...restProps}
          ref={ref as any}
          className={classNames.input}
        />
        {after && (
          <label htmlFor={name} className={classNames.appendContainer}>
            {React.cloneElement(after, {
              className: classNames.appendRight,
            })}
          </label>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
