import clsx from 'clsx'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { CLASS_NAMES } from './Resume-constants'
import { ResumeProps } from './Resume-types'

export const useResume = ({
  fileName,
  uploadUrl,
  onUpload,
  className,
  onRemove,
}: ResumeProps) => {
  const [file, setFile] = useState<File | undefined>(undefined)
  const [isUploading, setIsUploading] = useState(false)

  const uploadFile = useCallback(
    (file: File) => {
      if (!uploadUrl) return

      const xhr = new XMLHttpRequest()
      xhr.open('PUT', uploadUrl)
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            if (onUpload) {
              onUpload(file.name)
            }
          }
          setIsUploading(false)
        }
      }
      xhr.send(file)
      setIsUploading(true)
      setFile(file)
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

  const currentFileName = file ? file.name : fileName

  const handleRemove = () => {
    setFile(undefined)
    onRemove && onRemove()
  }

  const classNames = {
    ...CLASS_NAMES,
    container: clsx(CLASS_NAMES.container, className),
    fileLink: clsx(isUploading && CLASS_NAMES.fileLinkLoading),
    root: clsx(
      CLASS_NAMES.root.base,
      isDragReject && CLASS_NAMES.root.isDragReject,
      isDragAccept && CLASS_NAMES.root.isDragAccept
    ),
  }

  return {
    isDragActive,
    isDragReject,
    isDragAccept,
    classNames,
    getRootProps,
    getInputProps,
    file,
    isUploading,
    currentFileName,
    handleRemove,
  }
}
