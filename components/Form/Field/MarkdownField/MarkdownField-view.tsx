import React from 'react';
import get from 'lodash.get';
import { useFormContext, useFormState } from 'react-hook-form';

import clsx from 'clsx';
import { Editable, useEditor } from '@wysimark/react';

import { MardownFieldProps } from './MarkdownField-types';
import SkeletonLoader from '@/components/SkeletonLoader';
import Text from '@/components/Text';

const MarkdownField: React.FC<MardownFieldProps> = ({
  name,
  label,
  initialValue,
}) => {
  const { errors } = useFormState({ name, exact: true });

  const error = get(errors, name);

  const editor = useEditor({
    initialMarkdown: initialValue || '',
    minHeight: 295,
  });

  const { setValue } = useFormContext();

  const handleChange = () =>
    setValue(name, editor.getMarkdown(), { shouldDirty: true });

  return (
    <div className="w-full group/wrapper mb-4" data-error={Boolean(error)}>
      {label && (
        <Text
          className="text-sm text-gray-700 mb-2 text-left font-medium"
          text={label}
          skeletonProps={{ width: 80 }}
        />
      )}
      <div className="markdown mb-4">
        <SkeletonLoader
          height={295}
          after={<Editable editor={editor} onChange={handleChange} />}
        />
      </div>
      <p
        className={clsx(
          'transition-all text-sm text-red-600 -mt-2 text-left text overflow-hidden',
          error?.message ? 'max-h-[20px]' : 'max-h-[0px]'
        )}
      >
        {error?.message?.toString()}
      </p>
    </div>
  );
};

export default MarkdownField;
