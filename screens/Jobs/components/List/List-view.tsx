import React from 'react'
import Item from './components/Item/Item-view'

import { CLASS_NAMES } from './List-constants'

const List: React.FC = () => (
  <div className={CLASS_NAMES.container}>
    <Item />
    <Item />
  </div>
)

export default List
