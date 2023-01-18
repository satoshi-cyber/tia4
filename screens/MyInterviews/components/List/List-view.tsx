import React from 'react';
import { LoadingProvider } from '@/components';

import { Item, EmptyScreen } from './components';
import { CLASS_NAMES } from './List-constants';
import { useMyInterviews } from './List-hook';

const List: React.FC = () => {
  const { myInterviews, fetching } = useMyInterviews();

  return (
    <LoadingProvider isLoading={fetching}>
      <div className={CLASS_NAMES.container}>
        {myInterviews?.length === 0 ? (
          <EmptyScreen />
        ) : (
          myInterviews?.map((item) => (
            <Item key={item.id} id={item.id} thumbnail={item.thumbnail} />
          ))
        )}
      </div>
    </LoadingProvider>
  );
};

export default List;
