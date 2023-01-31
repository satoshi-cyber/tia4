import React from 'react';
import { LoadingProvider } from '@/components';

import { Item, EmptyScreen } from './components';
import { CLASS_NAMES } from './List-constants';
import { useMyInterviews } from './List-hook';

const List: React.FC = () => {
  const { myInterviews, fetching } = useMyInterviews();

  return (
    <LoadingProvider isLoading={fetching}>
      {myInterviews?.length === 0 ? (
        <EmptyScreen />
      ) : (
        <div className={CLASS_NAMES.container}>
          {myInterviews?.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              thumbnail={item.thumbnail}
              date={item.createdAt}
              avatar={item.job?.company?.avatarUrl}
              companyName={item.job?.company?.name}
              jobTitle={item.job?.title}
            />
          ))}
        </div>
      )}
    </LoadingProvider>
  );
};

export default List;
