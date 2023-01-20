import clsx from 'clsx';
import React from 'react';

import { PrimaryButtonProps } from './PrimaryButton-types';

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  className,
  before,
  ...restProps
}) => (
  <button
    type="button"
    {...restProps}
    className={clsx(
      'transition-all bg-gray-800 bg-gradient-to-r from-purple-500 w-full p-3 px-6 text-lg text-gray-100 active:bg-indigo-800 focus:outline-none rounded-full shadow-sm ease-in-out disabled:from-purple-400 z-20 hover:shadow-button',
      className
    )}
  >
    <span className="flex flex-row items-center justify-center">
      {before}
      {title}
    </span>
  </button>
);

export default PrimaryButton;
