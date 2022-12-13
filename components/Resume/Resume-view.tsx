import React from 'react'
import { Icon, Text, ButtonIcon } from '@/components'

import { EditAvatarProps } from './Resume-types'
import { useEditAvatar } from './Resume-hook'

import clsx from 'clsx'
import Link from 'next/link'

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
    isDragAccept,
    isDragReject,
    isDragActive,
    onError,
    imageSrc,
    classNames,
  } = useEditAvatar({
    className,
    uploadUrl,
    onUpload,
    src,
  })

  return (
    <div className="mb-4">
      <Text
        className="text-sm text-gray-600 mb-3 text-left"
        text="Resume / CV:"
        skeletonProps={{ width: 80 }}
      />
      <div className="flex flex-row w-full items-center justify-between mb-5">
        <Link href="lorem.com/">
          <div className="flex flex-row items-center transition-all  hover:text-purple-800">
            <Icon name="HiOutlineDocument" size={30} className="mr-2" />
            <Text
              text={
                <p>
                  BersenPajaziti.pdf <span className="text-xs">(View)</span>
                </p>
              }
              skeletonProps={{ width: 200 }}
            />
          </div>
        </Link>
        <ButtonIcon
          name="HiXCircle"
          className="text-gray-600 transition-all hover:text-purple-800"
          size={25}
        />
      </div>
      <div
        {...getRootProps({
          className: clsx(
            'w-full flex transition-all justify-center h-[100px] border border-gray-300 shadow-sm rounded-lg items-center justify-center',
            isDragReject && 'border-red-600',
            isDragAccept && 'border-purple-800'
          ),
        })}
      >
        <input {...getInputProps()} />
        {isDragAccept && <Text className="text-sm" text="Drop your cv!" />}
        {isDragReject && (
          <Text
            className="text-sm text-red-600"
            text="File format is not supported!"
          />
        )}
        {!isDragActive && (
          <Text
            className="text-sm"
            skeletonProps={{ width: 260 }}
            text="Drag 'n' drop your cv here, or click to select file"
          />
        )}
      </div>
    </div>
  )
}

export default InputField
