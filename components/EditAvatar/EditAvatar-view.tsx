import React from 'react'

import { EditAvatarProps } from './EditAvatar-types'
import { useEditAvatar } from './EditAvatar-hook'
import { LABEL, SKELETON_PROPS } from './EditAvatar-constants'

import SkeletonLoader from '../SkeletonLoader'

const InputField: React.FC<EditAvatarProps> = ({
  src,
  className,
  uploadUrl,
  onUpload,
}) => {
  const {
    loading,
    getRootProps,
    getInputProps,
    onError,
    imageSrc,
    classNames,
  } = useEditAvatar({
    className,
    uploadUrl,
    onUpload,
    src,
  })

  if (loading) {
    return (
      <div className={classNames.container}>
        <SkeletonLoader {...SKELETON_PROPS} />
      </div>
    )
  }

  return (
    <div className={classNames.container}>
      <div {...getRootProps({ className: classNames.root })}>
        <input {...getInputProps()} />
        <img className={classNames.image} src={imageSrc} onError={onError} />
        <div className={classNames.upload}>
          <p className={classNames.label}>{LABEL}</p>
        </div>
      </div>
    </div>
  )
}

export default InputField
