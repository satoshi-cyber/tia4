import React from 'react';
import { get } from 'lodash';
import { useFormContext, useFormState } from 'react-hook-form';
import { Text } from '@/components';
import { Controller } from 'react-hook-form';
import { useCallback } from 'react';
import { Wysimark, useEditor } from '@wysimark/react';

import { MardownFieldProps } from './MardownField-types';

const MarkdownField: React.FC<MardownFieldProps> = ({
  name,
  label,
  ...restProps
}) => {
  const { errors } = useFormState({ name, exact: true });
  const { control } = useFormContext();

  const error = get(errors, name);

  const editor = useEditor({ initialMarkdown: '# Hamburgers' });
  const onClick = useCallback(() => alert(editor.getMarkdown()), []);

  return (
    <div className="w-full group/wrapper" data-error={Boolean(error)}>
      {label && (
        <Text
          className="text-sm text-gray-600 mb-3 text-left"
          text={label}
          skeletonProps={{ width: 80 }}
        />
      )}
      <div className="markdown mb-6">
        <Wysimark editor={editor} maxHeight={200} />
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
