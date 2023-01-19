import React from 'react';
import { Avatar, Text, SkeletonLoader, Icon } from '@/components';
import Link from 'next/link';

import { ItemProps } from './Item-types';

const Item: React.FC<ItemProps> = ({ thumbnail }) => (
  <div>
    <div className="flex-none rounded-xl shadow-sm overflow-hidden w-full h-[300px] md:h-[200px] bg-gray-200 relative group hover:shadow-hover">
      <SkeletonLoader
        height={300}
        after={
          <Link href="/app/my-interviews">
            <video
              className="absolute w-full h-full top-1/2 left-1/2 transition-all transform -translate-x-1/2 -translate-y-1/2 object-cover scale-x-flip rounded-xl drop-shadow-md group-hover:scale-y-110 group-hover:-scale-x-110"
              width="100%"
              height="100%"
              playsInline
              controls={false}
              muted
              autoPlay
              loop
              src={thumbnail}
            ></video>
            <Icon
              name="HiPlay"
              className="transition-all w-[80px] h-[80px] group-hover:w-[100px] group-hover:h-[100px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
            />
          </Link>
        }
      />
    </div>
    <div className="flex justify-between mt-4 mb-4 md:mb-10">
      <div className="flex w-full">
        <div className="mr-4">
          <Avatar name="Lorem LLC" size={40} round />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-1 justify-between">
            <Text
              className="text-lg"
              text="Lorem LLC"
              skeletonProps={{ width: 100 }}
            />
            <Text
              className="text-xs mb-2 text-gray-600"
              text="02/03/2021"
              skeletonProps={{ width: 60 }}
            />
          </div>
          <Text
            className="text-sm mb-1 text-gray-800"
            text="lorem ipsum job"
            skeletonProps={{ width: 160 }}
          />
        </div>
      </div>
    </div>
  </div>
);

export default Item;
