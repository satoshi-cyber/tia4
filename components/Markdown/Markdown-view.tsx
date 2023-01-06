import React from 'react';
import ReactMarkdown from 'react-markdown';

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
      after={text && <ReactMarkdown className="prose">{text}</ReactMarkdown>}
    />
  </div>
);

export default Markdown;
