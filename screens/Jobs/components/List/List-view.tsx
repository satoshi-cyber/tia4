import LoadingProvider from '@/context/LoadingProvider';
import React from 'react';

import { Item, EmptyScreen } from './components';
import { CLASS_NAMES } from './List-constants';
import { useJobs } from './List-hook';

const List: React.FC = () => {
  const { jobs, fetching } = useJobs();

  return (
    <LoadingProvider isLoading={fetching}>
      <div className={CLASS_NAMES.container}>
        {jobs?.length === 0 ? (
          <EmptyScreen />
        ) : (
          jobs?.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              title={item.title}
              deadline={item.deadline}
            />
          ))
        )}
      </div>
    </LoadingProvider>
  );
};

export default List;
