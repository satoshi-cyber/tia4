import React from 'react';
import Link from 'next/link';
import LoadingProvider from '@/context/LoadingProvider';

import { ResumeProps } from './Resume-types';
import { useResume } from './Resume-hook';
import {
  FILE_ICON_PROPS,
  FILE_LABEL_PROPS,
  LABEL_PROPS,
  REMOVE_BUTTON_PROPS,
  UPLOAD_LABEL_PROPS,
  FILE_LABEL_APPEND,
} from './Resume-constants';
import Icon from '../Icon';
import Text from '../Text';

const Resume: React.FC<ResumeProps> = ({
  src,
  className,
  uploadUrl,
  onUpload,
  fileName,
  isLoading,
  onRemove,
}) => {
  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject,
    isDragActive,
    classNames,
    currentFileName,
    isUploading,
    handleRemove,
  } = useResume({
    src,
    className,
    uploadUrl,
    onUpload,
    fileName,
    isLoading,
    onRemove,
  });

  return (
    <div className={classNames.container}>
      <Text className={classNames.label} {...LABEL_PROPS} />
      {(currentFileName || isLoading) && (
        <LoadingProvider isLoading={isUploading || isLoading}>
          <div className={classNames.fileContainer}>
            <Link
              href={src || ''}
              target="_blank"
              className={classNames.fileLink}
            >
              <div className={classNames.file}>
                <Icon {...FILE_ICON_PROPS} className={classNames.fileIcon} />
                <Text
                  text={
                    <span>
                      {currentFileName}{' '}
                      <span className={classNames.fileLabel}>
                        {FILE_LABEL_APPEND}
                      </span>
                    </span>
                  }
                  {...FILE_LABEL_PROPS}
                />
              </div>
            </Link>
            <button
              type="button"
              className={classNames.removeButton}
              onClick={handleRemove}
            >
              <Icon {...REMOVE_BUTTON_PROPS} />
            </button>
          </div>
        </LoadingProvider>
      )}
      <div
        {...getRootProps({
          className: classNames.root,
        })}
      >
        <input {...getInputProps()} />
        {isDragAccept && (
          <Text
            className={classNames.uploadLabel.isDragAccept}
            {...UPLOAD_LABEL_PROPS.isDragAccept}
          />
        )}
        {isDragReject && (
          <Text
            className={classNames.uploadLabel.isDragReject}
            {...UPLOAD_LABEL_PROPS.isDragReject}
          />
        )}
        {!isDragActive && (
          <Text
            className={classNames.uploadLabel.default}
            {...UPLOAD_LABEL_PROPS.default}
          />
        )}
      </div>
    </div>
  );
};

export default Resume;
