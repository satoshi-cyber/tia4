import React from 'react';

import { LayoutProps } from './Layout-types';

import Logo from '../../public/logo.svg';

const CenterLayout: React.FC<LayoutProps> = ({ children }) => (
  <div className={`flex flex-1 w-full justify-center items-center py-20`}>
    <div
      className={`p-4 md:p-6 max-w-[480px] w-full flex flex-col justify-center items-center`}
    >
      <Logo className="absolute top-4 left-4 md:top-6 md:left-6" width={120} />
      {children}
    </div>
  </div>
);

const Apply: React.FC<LayoutProps> = ({ children }) => (
  <div className="flex flex-1 flex-col w-full items-center py-10 pt-28 md:py-16 md:pl-[70px]">
    <div className="flex flex-col max-w-[600px] w-full p-4 md:p-6 items-center">
      <Logo className="absolute top-4 left-4 md:top-6 md:left-6" width={120} />
      {children}
    </div>
  </div>
);

const Default: React.FC<LayoutProps> = ({ children }) => (
  <div className="flex flex-1 flex-col w-full items-center py-10 pt-28 md:py-16 md:pl-[70px]">
    <div className="flex flex-col max-w-[700px] w-full p-4 md:p-6 items-center">
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
