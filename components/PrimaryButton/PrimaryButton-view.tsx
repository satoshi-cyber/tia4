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
      'transition-all p-3 bg-purple-800 bg-gradient-to-r from-purple-500 w-full text-lg text-gray-100 active:bg-indigo-800 focus:outline-none rounded-full ease-in-out disabled:from-purple-400 z-20 hover:shadow-button',
      className
    )}
  >
    <span className="flex flex-row items-center justify-center">
      {before}
      <span className="px-3">{title}</span>
    </span>
  </button>
);

export default PrimaryButton;
