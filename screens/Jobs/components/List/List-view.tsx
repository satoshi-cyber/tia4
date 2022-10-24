import React from 'react'
import Item from './components/Item/Item-view'

import { CLASS_NAMES } from './List-constants'
import { useJobs } from './List-hook'

const List: React.FC = () => {
  const { data, fetching } = useJobs()

  if (fetching) {
    return <p>loading..</p>
  }

  return (
    <div className={CLASS_NAMES.container}>
      {data?.jobs.map((item) => (
        <Item key={item.id} />
      ))}
    </div>
  )
}

export default List
