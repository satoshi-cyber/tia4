import { ButtonIcon } from '@/components';
import { Menu } from '@headlessui/react';
import dynamic from 'next/dynamic';

import { SettingsMenuProps } from './SettingsMenu-types';

export const SettingsMenu: React.FC<SettingsMenuProps> = ({
  handleDeleteJob,
}) => {
  return (
    <Menu
      as="div"
      className="relative inline-block text-left mb-8 absolute top-0 left-0"
    >
      <Menu.Button>
        {({ open }) => <ButtonIcon name="HiCog" active={open} />}
      </Menu.Button>
      <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <Menu.Item>
          {({ active }) => (
            <a
              className={`${
                active && 'text-red-800'
              } group flex w-full items-center rounded-md p-4 text-sm cursor-pointer transition-all`}
              onClick={handleDeleteJob}
            >
              Delete job
            </a>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default dynamic(() => Promise.resolve(SettingsMenu), {
  ssr: false,
});
