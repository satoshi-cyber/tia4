import React from 'react'
import { Icon } from '@/components'

import { CLASS_NAMES } from './Item-constants'
import { ItemProps } from './Item-types'

const Item: React.FC<ItemProps> = ({ title, deadline }) => (
  <div className={CLASS_NAMES.container}>
    <div>
      <p className={CLASS_NAMES.title}>{title}</p>
      <p className={CLASS_NAMES.deadline}>Deadline: {deadline}</p>
    </div>
    <div className="grid grid-cols-2 gap-4 ml-4">
      <Icon name="HiPencil" size={30} className="text-black" />
      <Icon name="HiExternalLink" size={30} className="text-black" />
    </div>
  </div>
)

export default Item
