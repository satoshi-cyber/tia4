import { Field, FormIcon } from '@/components/Form';
import React from 'react';

const Filters: React.FC = () => {
  return (
    <div className="md:sticky md:top-0 md:pt-2 mb-20 w-full bg-white z-10">
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
          <Field.Select
            label="Job"
            name="job"
            after={<FormIcon name="HiOutlineBriefcase" />}
            options={[
              { label: 'All', value: 'ALL' },
              { label: 'Career Highlight Reel', value: '1' },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
