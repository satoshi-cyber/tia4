import React from 'react'

import { CLASS_NAMES } from './Item-constants'

import { Icon } from '../../../../../../components'

const Item: React.FC = () => (
  <div className={CLASS_NAMES.container}>
    <div>
      <p className={CLASS_NAMES.title}>Lorem job</p>
      <p className={CLASS_NAMES.deadline}>Deadline: 11/12/2023</p>
    </div>
    <div className="grid grid-cols-2 gap-4 ml-4">
      <Icon name="HiPencil" size={30} className="text-black" />
      <Icon name="HiExternalLink" size={30} className="text-black" />
    </div>
  </div>
)

export default Item
