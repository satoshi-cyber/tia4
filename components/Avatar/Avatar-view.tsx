import React, { useContext } from 'react';
import { Root, Image, Fallback } from '@radix-ui/react-avatar';

import { AvatarProps } from './Avatar-types';

import SkeletonLoader from '../SkeletonLoader';
import clsx from 'clsx';
import S3UrlProvider from '@/context/S3UrlProvider';

const getInitials = (fullName: string) => {
  const allNames = fullName.trim().split(' ');
  const initials = allNames.reduce((acc, curr, index) => {
    if (index === 0 || index === allNames.length - 1) {
      acc = `${acc}${curr.charAt(0).toUpperCase()}`;
    }
    return acc;
  }, '');

  return initials;
};

const Avatar: React.FC<AvatarProps> = ({
  isLoading,
  size,
  className,
  src,
  text,
}) => {
  const { getUrl } = useContext(S3UrlProvider.Context);

  const initial = getInitials(text ?? '');

  const textSize = size > 40 ? 'text-lg' : size > 30 ? 'text-sm' : 'text-xs';

  return (
    <div style={{ flex: 'none', borderRadius: '100%' }} className={className}>
      <SkeletonLoader
        isLoading={isLoading}
        width={size}
        height={size}
        circle
        after={
          <Root
            style={{ width: size, height: size }}
            className={clsx(
              'relative flex shrink-0 overflow-hidden rounded-full border'
            )}
          >
            <Image
              src={src ? getUrl(src) : undefined}
              alt={text}
              className="aspect-square h-full w-full object-cover"
            />
            <Fallback
              className={`flex h-full w-full items-center justify-center text-gray-600 rounded-full bg-white ${textSize}`}
            >
              {initial}
            </Fallback>
          </Root>
        }
      />
    </div>
  );
};
export default Avatar;
