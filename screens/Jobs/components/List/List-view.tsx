import React from 'react'
import Item from './components/Item/Item-view'

import { CLASS_NAMES } from './List-constants'
import { useJobs } from './List-hook'

const List: React.FC = () => {
  const { jobs, fetching } = useJobs()

  return (
    <div className={CLASS_NAMES.container}>
      {jobs?.map((item) => (
        <Item
          key={item.id}
          isLoading={fetching}
          id={item.id}
          title={item.title}
          deadline={item.deadline}
        />
      ))}
    </div>
  )
}

export default List
