import clsx from 'clsx';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { CLASS_NAMES } from './EditAvatar-constants';
import { EditAvatarProps } from './EditAvatar-types';
import S3UrlProvider from '@/context/S3UrlProvider';

export const useEditAvatar = ({
  uploadUrl,
  onUpload,
  src,
  className,
}: EditAvatarProps) => {
  const [editMode, setEditMode] = useState(false);
  const [url, setUrl] = useState<string | undefined>(undefined);
  const [uploading, setIsUploading] = useState(false);

  const { invalidateUrl, getUrl } = useContext(S3UrlProvider.Context);

  const uploadFile = useCallback(
    (file: File) => {
      if (!uploadUrl) return;

      const xhr = new XMLHttpRequest();
      xhr.open('PUT', uploadUrl);
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            if (src) {
              invalidateUrl(src);
            }

            setUrl(URL.createObjectURL(file));
            if (onUpload) {
              onUpload();
            }
          }
          setIsUploading(false);
        }
      };
      xhr.send(file);
      setIsUploading(true);
      setUrl(undefined);
    },
    [uploadUrl]
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!acceptedFiles[0]) return;

      uploadFile(acceptedFiles[0]);
    },
    [uploadFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
  });

  useEffect(() => {
    setEditMode(false);
  }, [src]);

  const onError = () => setEditMode(true);

  const loading = !src || uploading;

  const imageSrc = url || (src && getUrl(src));

  const classNames = {
    container: clsx(CLASS_NAMES.container, className),
    root: CLASS_NAMES.root,
    image: clsx(
      CLASS_NAMES.image.base,
      (isDragActive || editMode) && CLASS_NAMES.image.editMode
    ),
    upload: clsx(
      CLASS_NAMES.upload.base,
      !(isDragActive || editMode) && CLASS_NAMES.upload.editMode
    ),
    label: CLASS_NAMES.label,
  };

  return {
    classNames,
    getRootProps,
    getInputProps,
    onError,
    loading,
    imageSrc,
  };
};
