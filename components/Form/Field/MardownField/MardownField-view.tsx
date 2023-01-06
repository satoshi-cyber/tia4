import React, { useEffect } from 'react';
import { get } from 'lodash';
import { useFormContext, useFormState, useWatch } from 'react-hook-form';
import { Text } from '@/components';

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
        <Wysimark editor={editor} maxHeight={250} onChange={handleChange} />
      </div>
      {error && (
        <p className="text-sm text-red-600 -mt-2 mb-6 text-left text">
          {error?.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default MarkdownField;
