import React from 'react';
import get from 'lodash.get';
import { useFormContext, useFormState } from 'react-hook-form';
import { SkeletonLoader, Text } from '@/components';
import clsx from 'clsx';
import { Wysimark, useEditor } from '@wysimark/react';

import { MardownFieldProps } from './MardownField-types';

const MarkdownField: React.FC<MardownFieldProps> = ({
  name,
  label,
  initialValue,
}) => {
  const { errors } = useFormState({ name, exact: true });

  const error = get(errors, name);

  const editor = useEditor({ initialMarkdown: initialValue || '' });

  const { setValue } = useFormContext();

  const handleChange = (e: any) =>
    setValue(name, e.getMarkdown(), { shouldDirty: true });

  return (
    <div className="w-full group/wrapper" data-error={Boolean(error)}>
      {label && (
        <Text
          className="text-sm text-gray-600 mb-3 text-left"
          text={label}
          skeletonProps={{ width: 80 }}
        />
      )}
      <div className="markdown mb-4 shadow-sm">
        <SkeletonLoader
          height={285}
          after={
            <Wysimark editor={editor} maxHeight={250} onChange={handleChange} />
          }
        />
      </div>
      <p
        className={clsx(
          'transition-all text-sm text-red-600 -mt-2 mb-6 text-left text overflow-hidden',
          error?.message ? 'max-h-[20px]' : 'max-h-[0px]'
        )}
      >
        {error?.message?.toString()}
      </p>
    </div>
  );
};

export default MarkdownField;
