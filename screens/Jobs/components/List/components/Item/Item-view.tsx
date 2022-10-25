import React from 'react'
import { ButtonIcon, Text } from '@/components'

import { CLASS_NAMES } from './Item-constants'
import { ItemProps } from './Item-types'
import { useItem } from './Item-hook'

const Item: React.FC<ItemProps> = ({ title, deadline, isLoading, id }) => {
  const { handleEditJob } = useItem({ jobId: id })

  return (
    <div className={CLASS_NAMES.container}>
      <div>
        <Text
          isLoading={isLoading}
          className={CLASS_NAMES.title}
          text={title}
          skeletonProps={{ width: 100 }}
        />
        <Text
          isLoading={isLoading}
          className={CLASS_NAMES.deadline}
          text={`Deadline: ${deadline}`}
          skeletonProps={{ width: 200 }}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 ml-4">
        <ButtonIcon
          isLoading={isLoading}
          name="HiPencil"
          onClick={handleEditJob}
          size={30}
          className="text-black"
        />
        <ButtonIcon
          isLoading={isLoading}
          name="HiExternalLink"
          size={30}
          className="text-black"
        />
      </div>
    </div>
  )
}

export default Item
