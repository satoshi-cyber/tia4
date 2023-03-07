import clsx from 'clsx';
import React, { useContext } from 'react';

import { PrimaryButtonProps } from './PrimaryButton-types';

import LoadingProvider from '../LoadingProvider';

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  className,
  before,
  isLoading,
  disabled,
  ...restProps
}) => {
  const isProviderLoading = useContext(LoadingProvider.Context);

  const loading =
    typeof isLoading === 'undefined' ? isProviderLoading : isLoading;

  const isDisabled = disabled || loading;

  return (
    <button
      type="button"
      {...restProps}
      disabled={isDisabled}
      className={clsx(
        'transition-all p-[10px] bg-purple-800 bg-gradient-to-r from-purple-500 w-full text-lg text-gray-100 hover:bg-indigo-800 active:bg-indigo-800 focus:outline-none rounded-full ease-in-out disabled:from-purple-400 hover:shadow-button',
        className
      )}
    >
      <span className="flex flex-row items-center justify-center">
        {before}
        <span className="px-3">{title}</span>
      </span>
    </button>
  );
};

export default PrimaryButton;
