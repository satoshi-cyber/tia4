import React from 'react';

import { LayoutProps } from './Layout-types';

import Logo from '../../public/logo.svg';
import Link from 'next/link';
import { URLS } from '@/config';
import clsx from 'clsx';

const CenterLayout: React.FC<LayoutProps> = ({ children }) => (
  <div className={`flex flex-1 w-full justify-center items-center py-20`}>
    <div
      className={`p-6 max-w-[500px] w-full flex flex-col justify-center items-center`}
    >
      <Link href={URLS.LANDING}>
        <Logo className="absolute top-6 left-6" width={120} />
      </Link>
      {children}
    </div>
  </div>
);

const Apply: React.FC<LayoutProps> = ({ children }) => (
  <div
    className={`flex flex-1 flex-col w-full items-center py-10 pt-28 md:py-16 md:pl-[70px] `}
  >
    <div className="flex flex-col max-w-[600px] w-full p-6 items-center">
      <Link href={URLS.LANDING}>
        <Logo className="absolute top-6 left-6" width={120} />
      </Link>
      {children}
    </div>
  </div>
);

const Default: React.FC<LayoutProps & { width?: string }> = ({
  children,
  width = 'max-w-[640px]',
}) => (
  <div
    className={`flex flex-1 flex-col w-full items-center py-10 pt-28 md:py-16 md:pl-[70px]`}
  >
    <div
      className={clsx(width, 'flex flex-col w-full p-6 md:px-0 items-center')}
    >
      {children}
    </div>
  </div>
);

const Layout = {
  Default,
  CenterLayout,
  Apply,
};

export default Layout;
