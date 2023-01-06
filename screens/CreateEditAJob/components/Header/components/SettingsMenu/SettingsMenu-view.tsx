import { ButtonIcon } from '@/components';
import { Menu } from '@headlessui/react';
import NoSSR from '@mpth/react-no-ssr';

import { SettingsMenuProps } from './SettingsMenu-types';

export const SettingsMenu: React.FC<SettingsMenuProps> = ({
  handleDeleteJob,
}) => {
  return (
    <NoSSR>
      <Menu
        as="div"
        className="relative inline-block text-left mb-8 -mr-[30px]"
      >
        <Menu.Button>
          {({ open }) => (
            <ButtonIcon
              name="HiCog"
              size={30}
              className={`${
                open
                  ? 'text-purple-800'
                  : 'text-gray-600 hover:text-purple-800 transition-all ease-in-out'
              } active:text-purple-800 `}
            />
          )}
        </Menu.Button>
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <a
                className={`${
                  active && 'text-red-800'
                } group flex w-full items-center rounded-md px-2 py-2 text-sm cursor-pointer transition-all`}
                onClick={handleDeleteJob}
              >
                Delete job
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </NoSSR>
  );
};

export default SettingsMenu;
