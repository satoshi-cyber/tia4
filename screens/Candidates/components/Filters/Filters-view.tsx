import { LoadingProvider } from '@/components';
import { Field, FormIcon } from '@/components/Form';
import React from 'react';

import { useFilters } from './Filters-hook';

const Filters: React.FC = () => {
  const { fetching, jobOptions } = useFilters();

  return (
    <div className="md:sticky md:top-0 md:pt-2 mb-10 w-full bg-white z-10">
      <div className="flex flex-col md:flex-row justify-between w-full border-b pb-3">
        <div className="flex flex-1 md:mr-8 md:max-w-[400px] md:-mb-4">
          <Field.Input
            label="Search"
            placeholder="ex: score: 70% - 90%"
            type="search"
            name="search"
            after={<FormIcon name="HiSearch" />}
          />
        </div>
        <div className="flex -mb-4">
          <LoadingProvider isLoading={fetching}>
            <Field.Select
              className="w-[200px]"
              label="Job"
              name="job"
              after={<FormIcon name="HiOutlineBriefcase" />}
              options={jobOptions}
            />
          </LoadingProvider>
        </div>
      </div>
    </div>
  );
};

export default Filters;
