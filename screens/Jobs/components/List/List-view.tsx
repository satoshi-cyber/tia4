import React from 'react'
import { LoadingProvider } from '@/components'

import Item from './components/Item/Item-view'
import { CLASS_NAMES } from './List-constants'
import { useJobs } from './List-hook'

const List: React.FC = () => {
  const { jobs, fetching } = useJobs()

  return (
    <LoadingProvider isLoading={fetching}>
      <div className={CLASS_NAMES.container}>
        {jobs?.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            title={item.title}
            deadline={item.deadline}
          />
        ))}
      </div>
    </LoadingProvider>
  )
}

export default List
