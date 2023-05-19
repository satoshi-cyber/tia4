import React from 'react';
import MarkdownBase from 'markdown-to-jsx';

import { TextProps } from './Markdown-types';

import SkeletonLoader from '../SkeletonLoader';

const Markdown: React.FC<TextProps> = ({
  text,
  isLoading,
  skeletonProps,
  ...restProps
}) => (
  <div {...restProps}>
    <SkeletonLoader
      isLoading={isLoading}
      {...skeletonProps}
      after={
        text && <MarkdownBase className="prose mx-auto">{text}</MarkdownBase>
      }
    />
  </div>
);

export default Markdown;
