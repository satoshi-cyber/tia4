import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { CLASS_NAMES } from './Resume-constants'
import { EditAvatarProps } from './Resume-types'

export const useEditAvatar = ({
  uploadUrl,
  onUpload,
  src,
  className,
}: EditAvatarProps) => {
  const [editMode, setEditMode] = useState(false)
  const [url, setUrl] = useState<string | undefined>(undefined)
  const [uploading, setIsUploading] = useState(false)

  const uploadFile = useCallback(
    (file: File) => {
      if (!uploadUrl) return

      const xhr = new XMLHttpRequest()
      xhr.open('PUT', uploadUrl)
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            setUrl(URL.createObjectURL(file))
            if (onUpload) {
              onUpload()
            }
          }
          setIsUploading(false)
        }
      }
      xhr.send(file)
      setIsUploading(true)
      setUrl(undefined)
    },
    [uploadUrl]
  )

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!acceptedFiles[0]) return

      uploadFile(acceptedFiles[0])
    },
    [uploadFile]
  )

  const {
    isDragAccept,
    isDragReject,
    isDragActive,
    getRootProps,
    getInputProps,
  } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      'application/pdf': [],
    },
  })

  useEffect(() => {
    setEditMode(false)
  }, [src])

  const onError = () => setEditMode(true)

  const loading = !src || uploading

  const imageSrc = url || src

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
  }

  return {
    isDragActive,
    isDragReject,
    isDragAccept,
    classNames,
    getRootProps,
    getInputProps,
    onError,
    loading,
    imageSrc,
  }
}
