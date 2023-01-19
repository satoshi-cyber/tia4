import clsx from 'clsx';
import React from 'react';

import { PrimaryButtonProps } from './PrimaryButton-types';

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  className,
  ...restProps
}) => (
  <button
    type="button"
    {...restProps}
    className={clsx(
      'ransition-all bg-gray-800 bg-gradient-to-r from-purple-500 w-full p-3 text-sm text-gray-100 active:bg-indigo-800 focus:outline-none rounded-full shadow-sm ease-in-out disabled:from-purple-400 z-20 hover:shadow-button',
      className
    )}
  >
    {title}
  </button>
);

export default PrimaryButton;
