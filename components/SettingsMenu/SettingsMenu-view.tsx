import { Menu } from '@headlessui/react';
import dynamic from 'next/dynamic';
import React from 'react';

import { SettingsMenuProps } from './SettingsMenu-types';

import ButtonIcon from '../ButtonIcon';

export const SettingsMenu: React.FC<SettingsMenuProps> = ({ items }) => {
  return (
    <Menu
      as="div"
      className="relative inline-block text-left mb-8 absolute top-0 left-0"
    >
      <Menu.Button as={React.Fragment}>
        {({ open }) => (
          <div>
            <ButtonIcon name="HiCog" active={open} />
          </div>
        )}
      </Menu.Button>
      <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
        {items.map(({ label, onClick, activeColor }) => (
          <Menu.Item key={label}>
            {({ active }) => (
              <a
                className={`${
                  active && (activeColor || 'text-purple-800')
                } group flex w-full items-center rounded-md py-3 px-4 text-sm cursor-pointer transition-all`}
                onClick={onClick}
              >
                {label}
              </a>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};

export default dynamic(() => Promise.resolve(SettingsMenu), {
  ssr: false,
});
